# AGENTS.md

## Commands

- `npm install` - install dependencies (Node 20.12+; project is ESM via `"type": "module"`).
- `npm run dev` - Express + Vite middleware + HMR at `http://localhost:3000`.
- `npm run build` - build the React client to `dist/`.
- `npm start` - serve `dist/` and the API on port 3000 with Express. Run `npm run build` first.
- `npx impeccable detect src/ --json` - run the Impeccable UI anti-pattern detector (`impeccable` dev dependency). An empty array means no findings.
- No test, lint, typecheck, or formatter scripts are configured; verify changes in the browser and with the API.

## Architecture

- `server/index.js` owns port 3000. It mounts `/api` routes before Vite middleware (dev) or `dist/` + SPA fallback (prod). Keep that ordering so API requests are not swallowed.
- React entry is `src/main.jsx`; page composition and filtering/event orchestration live in `src/App.jsx`.
- Catalog data is the single source of truth in `server/data/products.js`. The client fetches `/api/products` and `/api/categories`.
- `src/context/CartContext.jsx` owns cart state and persists it to `localStorage` under `markarte-cart-v1`.
- Checkout posts `{ items: [{ id, quantity }] }` to `/api/orders`. The server recalculates prices, shipping, and totals; never trust client prices.
- Shipping rules and currency formatting are shared in `shared/commerce.js` so the drawer and server totals stay aligned.
- Styles live in `src/styles.css` and are imported by `src/main.jsx`. Keep the existing CSS variables, class names, and responsive breakpoints.
- Product and editorial artwork is local SVG under `public/images/`: `products/<slug>.svg` per catalog item, plus `hero-artisan.svg`, `about-artisan.svg`, and `favicon.svg`. The catalog references them with absolute paths such as `/images/products/taza-ceramica.svg`. Keep the shared 800×800 viewBox and warm earthy palette when adding art.
- Typography uses `--font-display` (serif) for headings and `--font-body` for text; keep new UI on those tokens instead of introducing new font stacks.

## Gotchas

- Development uses one HTTP server: Express plus Vite in middleware mode. Client edits get HMR; edits to `server/` require restarting `npm run dev`.
- Product and hero/about images are committed local SVGs, so the UI renders offline. AI photo generation is not required; add new pieces as SVGs in `public/images/products/`.
- Impeccable's detector expects design tokens and accessible markup; re-run it after UI edits rather than assuming the previous empty report still holds.
- User-facing copy is Spanish. Keep new UI text in Spanish unless asked otherwise.
- Login and newsletter are demo-only. The checkout is a mock: no auth, database, payment processing, or order persistence.
- `npm run build` output is `dist/` and is gitignored. Do not edit generated files.
