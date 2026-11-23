import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  initialAdmin,
  initialContact,
  initialContent,
  initialEnquiries,
  initialExperiences,
  initialGallery,
} from "../data/mockData.js";
import { generateEnquiryId, normalizePhone } from "../lib/leads.js";

const STORAGE_KEY = "aryans-farmstays-demo-v1";
const SESSION_KEY = "aryans-farmstays-admin-session";

const AppContext = createContext(null);

const uid = (prefix) => prefix + Math.random().toString(36).slice(2, 8).toUpperCase();

function nowIso() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function AppProvider({ children }) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [experiences, setExperiences] = useState(initialExperiences);
  const [gallery, setGallery] = useState(initialGallery);
  const [content, setContentState] = useState(initialContent);
  const [contact, setContactState] = useState(initialContact);
  const [admin, setAdmin] = useState(initialAdmin);
  const [isAuthed, setIsAuthed] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState([]);
  const enquiriesRef = useRef(enquiries);
  enquiriesRef.current = enquiries;

  // Load persisted demo data after hydration (never during render — avoids SSR mismatch).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved.enquiries)) setEnquiries(saved.enquiries);
        if (Array.isArray(saved.experiences)) setExperiences(saved.experiences);
        if (Array.isArray(saved.gallery)) setGallery(saved.gallery);
        if (saved.content) setContentState({ ...initialContent, ...saved.content });
        if (saved.contact) setContactState({ ...initialContact, ...saved.contact });
        if (saved.admin) setAdmin({ ...initialAdmin, ...saved.admin });
      }
      setIsAuthed(window.sessionStorage.getItem(SESSION_KEY) === "1");
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ enquiries, experiences, gallery, content, contact, admin }),
      );
    } catch {
      /* storage full or disabled */
    }
  }, [hydrated, enquiries, experiences, gallery, content, contact, admin]);

  const toast = useCallback((message, type = "success") => {
    const id = uid("T");
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);
  const dismissToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  // Enquiries ------------------------------------------------------------
  const addEnquiry = useCallback((data) => {
    const enquiry = {
      id: generateEnquiryId(enquiriesRef.current),
      customerName: data.customerName.trim(),
      phone: normalizePhone(data.phone),
      email: (data.email || "").trim(),
      property: data.property,
      experience: data.experience,
      visitDate: data.visitDate,
      guests: Number(data.guests),
      message: (data.message || "").trim(),
      status: "New",
      adminNotes: "",
      createdAt: nowIso(),
    };
    enquiriesRef.current = [enquiry, ...enquiriesRef.current];
    setEnquiries(enquiriesRef.current);
    return enquiry;
  }, []);

  // Updates are always matched by enquiry ID, so one property's leads never affect another's.
  const updateEnquiry = useCallback((id, patch) => {
    setEnquiries((list) => list.map((e) => (e.id === id ? { ...e, ...patch, id: e.id } : e)));
  }, []);
  const deleteEnquiry = useCallback((id) => {
    setEnquiries((list) => list.filter((e) => e.id !== id));
  }, []);

  // Experiences ----------------------------------------------------------
  const addExperience = useCallback((data) => setExperiences((l) => [...l, { ...data, id: uid("EXP") }]), []);
  const updateExperience = useCallback((id, patch) => setExperiences((l) => l.map((x) => (x.id === id ? { ...x, ...patch } : x))), []);
  const deleteExperience = useCallback((id) => setExperiences((l) => l.filter((x) => x.id !== id)), []);

  // Gallery --------------------------------------------------------------
  const addImage = useCallback((data) => setGallery((l) => [{ ...data, id: uid("G") }, ...l]), []);
  const updateImage = useCallback((id, patch) => setGallery((l) => l.map((x) => (x.id === id ? { ...x, ...patch } : x))), []);
  const deleteImage = useCallback((id) => setGallery((l) => l.filter((x) => x.id !== id)), []);

  const setContent = useCallback((patch) => setContentState((c) => ({ ...c, ...patch })), []);
  const setContact = useCallback((patch) => setContactState((c) => ({ ...c, ...patch })), []);

  // Demo auth (frontend only, NOT secure) --------------------------------
  const login = useCallback(
    (email, password) => {
      const ok = email.trim().toLowerCase() === admin.email.toLowerCase() && password === admin.password;
      if (ok) {
        setIsAuthed(true);
        try { window.sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* noop */ }
      }
      return ok;
    },
    [admin.email, admin.password],
  );
  const logout = useCallback(() => {
    setIsAuthed(false);
    try { window.sessionStorage.removeItem(SESSION_KEY); } catch { /* noop */ }
  }, []);
  const updateAdmin = useCallback((patch) => setAdmin((a) => ({ ...a, ...patch })), []);

  const resetDemoData = useCallback(() => {
    setEnquiries(initialEnquiries);
    enquiriesRef.current = initialEnquiries;
    setExperiences(initialExperiences);
    setGallery(initialGallery);
    setContentState(initialContent);
    setContactState(initialContact);
  }, []);

  const value = useMemo(
    () => ({
      hydrated,
      enquiries, addEnquiry, updateEnquiry, deleteEnquiry,
      experiences, addExperience, updateExperience, deleteExperience,
      gallery, addImage, updateImage, deleteImage,
      content, setContent,
      contact, setContact,
      admin, updateAdmin, isAuthed, login, logout,
      toasts, toast, dismissToast,
      resetDemoData,
    }),
    [hydrated, enquiries, addEnquiry, updateEnquiry, deleteEnquiry, experiences, addExperience, updateExperience, deleteExperience, gallery, addImage, updateImage, deleteImage, content, setContent, contact, setContact, admin, updateAdmin, isAuthed, login, logout, toasts, toast, dismissToast, resetDemoData],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
