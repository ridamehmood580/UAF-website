# UAF Website (Next.js)

University of Agriculture, Faisalabad portal, converted from Vite/React to Next.js 15 (App Router).

## Run
```cmd
npm install --legacy-peer-deps
npm run dev
```
Open http://localhost:3000

## Production
```cmd
npm run build
npm start
```

## Structure
- `src/app/` - Next.js layout, page, global CSS (Tailwind v4)
- `src/App.tsx` - main portal (client component)
- `src/components/`, `src/page-builder/`, `src/data/`, `src/services/` - your original code
- `public/` - images
