# UAF Page Studio

## Superadmin dashboard

Open `/superadmin` for the separate superadmin sign-in and review dashboard. The UAF site's Admin Login modal also links to this page.

Set the credentials before using the sign-in screen:

1. Copy `.env.example` to `.env.local` in this folder.
2. Set `SUPERADMIN_USERNAME`, `SUPERADMIN_PASSWORD`, and `SUPERADMIN_SESSION_SECRET` to private values. Use a long random value for the session secret.
3. Restart the builder with `npm run dev`.

The sign-in session is stored in an HTTP-only cookie and expires after eight hours. Do not commit `.env.local`.

Design submissions and review decisions are stored by the Page Studio server in `storage/page-workflow.json`, so the designer, superadmin dashboard, and admin profile share the same review queue. This file is local runtime data and is excluded from Git.

When an admin publishes an accepted design, the Page Studio API writes it to `../uni/public/published-pages.json`. The `uni` app reads that file and renders published designs on the selected home page, section, faculty portal, or event detail page. Run both apps locally from their own folders (`npm run dev`) for this file based publishing flow.
