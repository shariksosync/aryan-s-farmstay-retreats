import LeadManager from "../components/admin/LeadManager.jsx";
import { PROPERTY_IDS } from "../data/mockData.js";

export default function ManasAgroLeads() {
  return <LeadManager key={PROPERTY_IDS.MANAS} propertyId={PROPERTY_IDS.MANAS} />;
}
