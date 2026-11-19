# UAF Page Studio

The admin designs pages in Page Studio and publishes them directly to the university website. Page templates contain page content only; the university site automatically places its shared header and footer around every page. The separate **Site-wide header** and **Site-wide footer** templates update those shared elements across the whole site. The dashboard shows current page publications, shared chrome and publication history.

## Run locally

Start both apps from their project folders:

1. In `webpage-builder`, run `npm run dev` (port 3001).
2. In `uni`, run `npm run dev` (port 3000).

Publishing writes each page, shared header/footer, and page-specific component as its own JSON file under `../uni/public/published-pages/` and, when present, mirrors those files under `../uni/dist/published-pages/`. Publishing the same target replaces that target's file. The Page Studio server keeps publication history in its ignored `storage/publication-history.json` file. Existing `published-pages.json` publications are read as a compatibility fallback.

For a deployed university site, deploy the updated `uni` output after publishing so the hosting provider receives the individual publication files.
