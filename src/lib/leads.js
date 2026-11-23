// Pure helpers for enquiry/lead logic. Kept framework-free so they can be unit tested.
import { PROPERTIES } from "../data/mockData.js";

export function propertyName(id) {
  return PROPERTIES.find((p) => p.id === id)?.name ?? "Unknown property";
}

/** Next sequential ID: AF + zero-padded number, one higher than the largest existing. */
export function generateEnquiryId(enquiries) {
  const max = enquiries.reduce((m, e) => {
    const n = parseInt(String(e.id).replace(/\D/g, ""), 10);
    return Number.isFinite(n) && n > m ? n : m;
  }, 0);
  return "AF" + String(max + 1).padStart(3, "0");
}

export function leadsForProperty(enquiries, propertyId) {
  return enquiries.filter((e) => e.property === propertyId);
}

export function filterLeads(enquiries, filters = {}) {
  const { propertyId, search, status, experience, dateFrom, dateTo, sort = "newest" } = filters;
  const q = (search || "").trim().toLowerCase();
  const qDigits = q.replace(/\D/g, "");
  const list = enquiries.filter((e) => {
    if (propertyId && propertyId !== "all" && e.property !== propertyId) return false;
    if (status && status !== "all" && e.status !== status) return false;
    if (experience && experience !== "all" && e.experience !== experience) return false;
    if (dateFrom && e.visitDate < dateFrom) return false;
    if (dateTo && e.visitDate > dateTo) return false;
    if (q) {
      const hit =
        e.customerName.toLowerCase().includes(q) ||
        e.id.toLowerCase().includes(q) ||
        (e.email || "").toLowerCase().includes(q) ||
        (qDigits.length > 0 && e.phone.includes(qDigits));
      if (!hit) return false;
    }
    return true;
  });
  list.sort((a, b) => (sort === "oldest" ? a.createdAt.localeCompare(b.createdAt) : b.createdAt.localeCompare(a.createdAt)));
  return list;
}

export function computeStats(enquiries) {
  const count = (pred) => enquiries.filter(pred).length;
  return {
    total: enquiries.length,
    new: count((e) => e.status === "New"),
    contacted: count((e) => ["Contacted", "Follow-up", "Interested"].includes(e.status)),
    confirmed: count((e) => ["Confirmed", "Completed"].includes(e.status)),
    closedLost: count((e) => ["Cancelled", "Lost"].includes(e.status)),
    kolhe: count((e) => e.property === "new-kolhe-khind"),
    manas: count((e) => e.property === "manas-agro"),
  };
}

export function statusCounts(enquiries, statuses) {
  return statuses.map((s) => ({ status: s, count: enquiries.filter((e) => e.status === s).length }));
}

export function normalizePhone(phone) {
  let digits = String(phone || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

export function validateEnquiry(data) {
  const errors = {};
  if (!data.customerName || data.customerName.trim().length < 2) errors.customerName = "Please enter your full name.";
  if (!/^[6-9]\d{9}$/.test(normalizePhone(data.phone))) errors.phone = "Enter a valid 10-digit mobile number.";
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email address.";
  if (!data.property) errors.property = "Please select a farmhouse.";
  if (!data.experience) errors.experience = "Please select an experience.";
  if (!data.visitDate) errors.visitDate = "Please choose a visit date.";
  const g = Number(data.guests);
  if (!data.guests || !Number.isFinite(g) || g < 1) errors.guests = "Enter number of guests.";
  else if (g > 500) errors.guests = "For groups above 500, please call us.";
  return errors;
}

export function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value.length <= 10 ? value + "T00:00:00" : value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
