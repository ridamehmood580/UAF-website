# UAF Page Studio

The admin designs pages in Page Studio and publishes them directly to the university website. Page templates contain page content only; the university site automatically places its shared header and footer around every page. The separate **Site-wide header** and **Site-wide footer** templates update those shared elements across the whole site. The dashboard shows current page publications, shared chrome and publication history.

## Run locally

Start both apps from their project folders:

1. In `webpage-builder`, run `npm run dev` (port 3001).
2. In `uni`, run `npm run dev` (port 3000).

Publishing writes page content and shared header/footer settings to `../uni/public/published-pages.json` and, when present, `../uni/dist/published-pages.json`. The Page Studio server keeps publication history in its ignored `storage/publication-history.json` file.

For a deployed static university site, deploy the updated `uni` output after publishing so the hosting provider receives the new `published-pages.json` file.
