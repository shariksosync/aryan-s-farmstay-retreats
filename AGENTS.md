<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- App code is plain JavaScript/JSX in `src/components`, `src/pages`, `src/data`, `src/lib`, `src/store`; route files in `src/routes` stay thin `.tsx` wrappers. Why: the client requires React + Tailwind + JS only, while the framework needs typed route files.
- Do not add UI kits, icon libraries, chart libraries or a backend; icons are inline SVG in `src/components/Icons.jsx`, charts are hand-built SVG/CSS. Why: explicit client constraint.
- All site and admin data flows through `AppProvider` (`src/store/AppStore.jsx`), mounted in `__root.tsx`, persisted to localStorage after hydration. Why: public site and admin panel must share state with no backend.
- Inside `/admin`, sections switch via React state in `AdminApp.jsx`, not extra routes. Why: client asked for state-based navigation instead of a routing library.
- Lead updates/deletes are always keyed by enquiry ID and property modules filter by property ID via `src/lib/leads.js`. Why: the two farmhouse lead modules must stay independent.
