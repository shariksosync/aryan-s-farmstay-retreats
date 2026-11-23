import { useState } from "react";
import { Link } from "@tanstack/react-router";
import Logo from "../components/Logo.jsx";
import Icon from "../components/Icons.jsx";
import SafeImage from "../components/SafeImage.jsx";
import { useApp } from "../store/AppStore.jsx";

export default function AdminLogin() {
  const { login, toast } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email address.";
    if (!password) errs.password = "Password is required.";
    setErrors(errs);
    setAuthError("");
    if (Object.keys(errs).length) return;
    setBusy(true);
    setTimeout(() => {
      const ok = login(email, password);
      setBusy(false);
      if (ok) toast("Welcome back! You are now signed in.");
      else setAuthError("Invalid email or password. Please try again.");
    }, 500);
  };

  return (
    <div className="grid min-h-screen bg-cream lg:grid-cols-[1.1fr_1fr]">
      <div className="relative hidden overflow-hidden lg:block">
        <SafeImage src="/images/lawn-seating.jpg" alt="Aryan's Farmstays lawn" className="absolute inset-0" loading="eager" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo tone="light" />
          <div className="max-w-md">
            <p className="font-display text-5xl font-medium leading-tight text-ivory">Manage every stay, every celebration.</p>
            <p className="mt-4 text-ivory/75">Leads, experiences, gallery and website content for New Kolhe Khind Farms and Manas Agro Farms — in one place.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="lg:hidden"><Logo /></div>
          <span className="eyebrow mt-10 lg:mt-0">Admin Panel</span>
          <h1 className="mt-4 font-display text-5xl font-semibold text-deep">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">Use your admin credentials to access the dashboard.</p>

          <form onSubmit={submit} noValidate className="mt-9 space-y-5">
            {authError && (
              <div role="alert" className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                <Icon name="alert" className="h-4 w-4 shrink-0" /> {authError}
              </div>
            )}
            <label className="block">
              <span className="field-label">Email address</span>
              <input type="email" autoComplete="username" className={`field ${errors.email ? "field-error" : ""}`} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@aryansfarmstays.com" />
              {errors.email && <span className="mt-1.5 block text-xs font-medium text-destructive">{errors.email}</span>}
            </label>
            <label className="block">
              <span className="field-label">Password</span>
              <span className="relative block">
                <input type={show ? "text" : "password"} autoComplete="current-password" className={`field pr-12 ${errors.password ? "field-error" : ""}`} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground hover:text-forest" aria-label={show ? "Hide password" : "Show password"}>
                  <Icon name={show ? "eyeOff" : "eye"} className="h-[1.1rem] w-[1.1rem]" />
                </button>
              </span>
              {errors.password && <span className="mt-1.5 block text-xs font-medium text-destructive">{errors.password}</span>}
            </label>
            <button type="submit" disabled={busy} className="btn btn-forest w-full">
              {busy ? "Signing in…" : "Login"} {!busy && <Icon name="arrowRight" className="h-4 w-4" />}
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-gold/40 bg-gold/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">Demo credentials</p>
            <p className="mt-2 text-sm text-ink">Email: <span className="font-mono">admin@aryansfarmstays.com</span></p>
            <p className="text-sm text-ink">Password: <span className="font-mono">Admin@123</span></p>
            <button type="button" className="btn btn-sm btn-quiet mt-3" onClick={() => { setEmail("admin@aryansfarmstays.com"); setPassword("Admin@123"); setErrors({}); setAuthError(""); }}>
              Fill demo credentials
            </button>
            <p className="mt-3 text-[0.7rem] leading-relaxed text-muted-foreground">Frontend-only demonstration. This is not secure production authentication.</p>
          </div>

          <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-deep">
            <Icon name="chevronLeft" className="h-4 w-4" /> Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
