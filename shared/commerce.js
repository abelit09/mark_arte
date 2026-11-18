export const FREE_SHIPPING_THRESHOLD = 75
export const SHIPPING_COST = 4.95

export function roundCurrency(amount) {
  return Math.round((Number(amount) + Number.EPSILON) * 100) / 100
}

export function getShippingCost(subtotal) {
  const normalizedSubtotal = Number(subtotal) || 0
  if (normalizedSubtotal <= 0) return 0
  return normalizedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(amount) || 0)
}
