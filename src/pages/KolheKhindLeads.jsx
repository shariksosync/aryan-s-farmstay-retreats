import LeadManager from "../components/admin/LeadManager.jsx";
import { PROPERTY_IDS } from "../data/mockData.js";

export default function KolheKhindLeads() {
  return <LeadManager key={PROPERTY_IDS.KOLHE} propertyId={PROPERTY_IDS.KOLHE} />;
}
