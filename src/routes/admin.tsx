import { createFileRoute } from "@tanstack/react-router";
import AdminApp from "../pages/AdminApp.jsx";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Aryan's Farmstays" },
      { name: "description", content: "Admin dashboard for managing Aryan's Farmstays enquiries, experiences, gallery and website content." },
      { property: "og:title", content: "Admin Panel — Aryan's Farmstays" },
      { property: "og:description", content: "Lead management and website content for Aryan's Farmstays." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminApp,
});
