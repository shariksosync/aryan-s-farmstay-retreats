import { useEffect, useMemo, useState } from "react";
import AdminSidebar, { ADMIN_SECTIONS } from "../components/admin/AdminSidebar.jsx";
import AdminHeader from "../components/admin/AdminHeader.jsx";
import AdminLogin from "./AdminLogin.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import KolheKhindLeads from "./KolheKhindLeads.jsx";
import ManasAgroLeads from "./ManasAgroLeads.jsx";
import AllEnquiries from "./AllEnquiries.jsx";
import ExperienceManagement from "./ExperienceManagement.jsx";
import GalleryManagement from "./GalleryManagement.jsx";
import WebsiteContent from "./WebsiteContent.jsx";
import ContactManagement from "./ContactManagement.jsx";
import AdminProfile from "./AdminProfile.jsx";
import Logo from "../components/Logo.jsx";
import { useApp } from "../store/AppStore.jsx";
import { PROPERTY_IDS } from "../data/mockData.js";

const SUBTITLES = {
  dashboard: "Live overview of enquiries and bookings across both farmhouses",
  kolhe: "Enquiries for New Kolhe Khind Farms only",
  manas: "Enquiries for Manas Agro Farms only",
  all: "Every enquiry from both farmhouses",
  experiences: "Add, edit, hide or remove experiences shown on the website",
  gallery: "Manage gallery photos and categories",
  content: "Edit headings and text shown across the website",
  contact: "Phone numbers, email, WhatsApp and address",
  profile: "Your account and password",
};

const VIEW_KEY = "aryans-admin-view";

export default function AdminApp() {
  const { hydrated, isAuthed, logout, enquiries, admin, toast } = useApp();
  const [view, setView] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = window.sessionStorage.getItem(VIEW_KEY);
    if (saved && ADMIN_SECTIONS.some((s) => s.id === saved)) setView(saved);
  }, []);

  const navigate = (id) => {
    setView(id);
    setMenuOpen(false);
    try { window.sessionStorage.setItem(VIEW_KEY, id); } catch { /* noop */ }
    window.scrollTo({ top: 0 });
  };

  const handleLogout = () => {
    logout();
    navigate("dashboard");
    toast("You have been logged out.");
  };

  const counts = useMemo(() => {
    const isNew = (e) => e.status === "New";
    return {
      kolhe: enquiries.filter((e) => e.property === PROPERTY_IDS.KOLHE && isNew(e)).length,
      manas: enquiries.filter((e) => e.property === PROPERTY_IDS.MANAS && isNew(e)).length,
      all: enquiries.filter(isNew).length,
    };
  }, [enquiries]);

  if (!hydrated) {
    return (
      <div className="grid min-h-screen place-items-center bg-admin-bg">
        <div className="animate-pulse"><Logo /></div>
      </div>
    );
  }

  if (!isAuthed) return <AdminLogin />;

  const section = ADMIN_SECTIONS.find((s) => s.id === view) || ADMIN_SECTIONS[0];

  const page = {
    dashboard: <AdminDashboard onNavigate={navigate} />,
    kolhe: <KolheKhindLeads />,
    manas: <ManasAgroLeads />,
    all: <AllEnquiries />,
    experiences: <ExperienceManagement />,
    gallery: <GalleryManagement />,
    content: <WebsiteContent />,
    contact: <ContactManagement />,
    profile: <AdminProfile onLogout={handleLogout} />,
  }[section.id];

  return (
    <div className="min-h-screen bg-admin-bg">
      <AdminSidebar active={section.id} onNavigate={navigate} onLogout={handleLogout} counts={counts} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="lg:pl-72">
        <AdminHeader title={section.label} subtitle={SUBTITLES[section.id]} admin={admin} onMenu={() => setMenuOpen(true)} onProfile={() => navigate("profile")} />
        <main className="px-4 py-6 sm:px-8 sm:py-8">{page}</main>
      </div>
    </div>
  );
}
