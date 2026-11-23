import { describe, expect, it } from "vitest";
import { computeStats, filterLeads, generateEnquiryId, leadsForProperty, validateEnquiry } from "../lib/leads.js";
import { initialEnquiries } from "../data/mockData.js";

type Lead = { id: string; property: string; status: string; createdAt: string; customerName: string; phone: string };
const leads = initialEnquiries as Lead[];

describe("enquiry rules", () => {
  it("assigns the next sequential AF id", () => {
    expect(generateEnquiryId(leads)).toBe("AF019");
    expect(generateEnquiryId([])).toBe("AF001");
  });

  it("keeps each farmhouse's leads separate by property id", () => {
    const kolhe = leadsForProperty(leads, "new-kolhe-khind") as Lead[];
    const manas = leadsForProperty(leads, "manas-agro") as Lead[];
    expect(kolhe.length).toBeGreaterThanOrEqual(8);
    expect(manas.length).toBeGreaterThanOrEqual(8);
    expect(kolhe.every((l) => l.property === "new-kolhe-khind")).toBe(true);
    expect(manas.every((l) => l.property === "manas-agro")).toBe(true);
    expect(kolhe.length + manas.length).toBe(leads.length);
  });

  it("filters by property and status together", () => {
    const rows = filterLeads(leads, { propertyId: "manas-agro", status: "New" }) as Lead[];
    expect(rows.map((r) => r.id).sort()).toEqual(["AF002", "AF016"]);
  });

  it("searches by phone number", () => {
    const rows = filterLeads(leads, { search: "9876543210" }) as Lead[];
    expect(rows.map((r) => r.id)).toEqual(["AF001"]);
  });

  it("counts dashboard stats from the data", () => {
    const s = computeStats(leads);
    expect(s.total).toBe(18);
    expect(s.new).toBe(4);
    expect(s.kolhe).toBe(9);
    expect(s.manas).toBe(9);
    expect(s.closedLost).toBe(4);
  });

  it("requires name, valid mobile, farmhouse, experience, date and guests", () => {
    const errors = validateEnquiry({ customerName: "", phone: "12345", property: "", experience: "", visitDate: "", guests: "" });
    expect(Object.keys(errors).sort()).toEqual(["customerName", "experience", "guests", "phone", "property", "visitDate"]);
    const ok = validateEnquiry({ customerName: "Rahul", phone: "9876543210", property: "manas-agro", experience: "Pool Party", visitDate: "2026-12-01", guests: 10 });
    expect(ok).toEqual({});
  });
});
