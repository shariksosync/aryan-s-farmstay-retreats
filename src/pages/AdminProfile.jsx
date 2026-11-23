import { useEffect, useState } from "react";
import Icon from "../components/Icons.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import { FormField, SectionCard } from "../components/admin/FormControls.jsx";
import { useApp } from "../store/AppStore.jsx";

export default function AdminProfile({ onLogout }) {
  const { admin, updateAdmin, toast, resetDemoData } = useApp();
  const [profile, setProfile] = useState({ name: admin.name, email: admin.email });
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwErrors, setPwErrors] = useState({});
  const [profileErrors, setProfileErrors] = useState({});
  const [show, setShow] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  useEffect(() => setProfile({ name: admin.name, email: admin.email }), [admin.name, admin.email]);
  const initials = admin.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  const saveProfile = (e) => {
    e.preventDefault();
    const errs = {};
    if (!profile.name.trim()) errs.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) errs.email = "Enter a valid email.";
    setProfileErrors(errs);
    if (Object.keys(errs).length) return;
    updateAdmin({ name: profile.name.trim(), email: profile.email.trim() });
    toast("Profile updated.");
  };

  const changePassword = (e) => {
    e.preventDefault();
    const errs = {};
    if (pw.current !== admin.password) errs.current = "Current password is incorrect.";
    if (pw.next.length < 8) errs.next = "Use at least 8 characters.";
    else if (!/[A-Z]/.test(pw.next) || !/\d/.test(pw.next)) errs.next = "Include an uppercase letter and a number.";
    if (pw.confirm !== pw.next) errs.confirm = "Passwords do not match.";
    setPwErrors(errs);
    if (Object.keys(errs).length) return;
    updateAdmin({ password: pw.next });
    setPw({ current: "", next: "", confirm: "" });
    toast("Password changed. Use the new password next time you sign in.");
  };

  const type = show ? "text" : "password";
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1.3fr]">
      <div className="space-y-6">
        <div className="admin-card overflow-hidden">
          <div className="h-24 bg-forest" />
          <div className="-mt-10 px-6 pb-6">
            <span className="grid h-20 w-20 place-items-center rounded-2xl border-4 border-card bg-deep font-display text-3xl font-semibold text-gold">{initials}</span>
            <h2 className="mt-4 font-display text-2xl font-semibold text-deep">{admin.name}</h2>
            <p className="text-sm text-muted-foreground">{admin.email}</p>
            <p className="mt-2 inline-flex rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold-dark">{admin.role}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <button className="btn btn-sm btn-danger" onClick={onLogout}><Icon name="logout" className="h-4 w-4" /> Logout</button>
              <button className="btn btn-sm btn-quiet" onClick={() => setConfirmReset(true)}><Icon name="refresh" className="h-4 w-4" /> Reset demo data</button>
            </div>
          </div>
        </div>
        <div className="flex gap-3 rounded-2xl border border-gold/40 bg-gold/10 p-4 text-xs leading-relaxed text-ink">
          <Icon name="info" className="h-4 w-4 shrink-0 text-gold-dark" />
          This admin panel is a frontend-only demonstration. Credentials and data are stored in this browser only and are not secure.
        </div>
      </div>

      <div className="space-y-6">
        <SectionCard title="Profile details">
          <form onSubmit={saveProfile} noValidate className="grid gap-4 sm:grid-cols-2">
            <FormField label="Admin name" error={profileErrors.name}><input className="field" value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} /></FormField>
            <FormField label="Admin email" error={profileErrors.email} hint="Used to sign in"><input className="field" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} /></FormField>
            <div className="flex justify-end sm:col-span-2"><button className="btn btn-sm btn-forest" type="submit"><Icon name="check" className="h-4 w-4" /> Save profile</button></div>
          </form>
        </SectionCard>

        <SectionCard title="Change password" description="Demo interface — updates the password used on the login screen" actions={<button type="button" className="btn btn-sm btn-quiet" onClick={() => setShow((s) => !s)}><Icon name={show ? "eyeOff" : "eye"} className="h-4 w-4" /> {show ? "Hide" : "Show"}</button>}>
          <form onSubmit={changePassword} noValidate className="grid gap-4 sm:grid-cols-3">
            <FormField label="Current password" error={pwErrors.current}><input type={type} className="field" value={pw.current} onChange={(e) => setPw((p) => ({ ...p, current: e.target.value }))} autoComplete="current-password" /></FormField>
            <FormField label="New password" error={pwErrors.next}><input type={type} className="field" value={pw.next} onChange={(e) => setPw((p) => ({ ...p, next: e.target.value }))} autoComplete="new-password" /></FormField>
            <FormField label="Confirm new password" error={pwErrors.confirm}><input type={type} className="field" value={pw.confirm} onChange={(e) => setPw((p) => ({ ...p, confirm: e.target.value }))} autoComplete="new-password" /></FormField>
            <div className="flex justify-end sm:col-span-3"><button className="btn btn-sm btn-gold" type="submit"><Icon name="lock" className="h-4 w-4" /> Update password</button></div>
          </form>
        </SectionCard>
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Reset demo data?"
        message="All enquiries, experiences, gallery images, website content and contact details will be restored to the original sample data."
        confirmLabel="Reset"
        onClose={() => setConfirmReset(false)}
        onConfirm={() => { resetDemoData(); toast("Demo data restored."); }}
      />
    </div>
  );
}
