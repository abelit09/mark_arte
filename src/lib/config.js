/**
 * Static demo builds (GitHub Pages) have no Express API. The catalog is
 * exported to `api/products.json` and `api/categories.json` at build time,
 * and checkout is simulated in the browser.
 */
export const isStaticDemo = import.meta.env.VITE_STATIC_DEMO === 'true'

const baseUrl = import.meta.env.BASE_URL

export function assetUrl(path) {
  return `${baseUrl}${String(path ?? '').replace(/^\/+/, '')}`
}

export function catalogUrl(resource) {
  return isStaticDemo ? assetUrl(`api/${resource}.json`) : `/api/${resource}`
}
