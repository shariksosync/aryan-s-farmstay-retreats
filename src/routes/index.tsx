import { createFileRoute } from "@tanstack/react-router";
import Home from "../pages/Home.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aryan's Farmstays — Private Farmhouses & Pool Villas near Pune" },
      {
        name: "description",
        content:
          "Private farmhouses, swimming pool villas and agro-tourism stays near Pune. Book picnics, staycations, pool parties and celebrations at New Kolhe Khind Farms and Manas Agro Farms.",
      },
      { property: "og:title", content: "Aryan's Farmstays — Escape to Nature. Experience Luxury." },
      {
        property: "og:description",
        content: "Private pool villas, open lawns and homestyle dining at two flagship farmhouses near Pune, Maharashtra.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});
