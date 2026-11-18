import { Router } from 'express'
import { products } from '../data/products.js'
import { getShippingCost, roundCurrency } from '../../shared/commerce.js'

const router = Router()

router.post('/', (request, response) => {
  const requestedItems = Array.isArray(request.body?.items) ? request.body.items : []

  if (requestedItems.length === 0) {
    return response.status(400).json({ error: 'El carrito está vacío.' })
  }

  const normalizedItems = []

  for (const item of requestedItems) {
    const product = products.find((candidate) => candidate.id === item?.id)
    const quantity = Number(item?.quantity)

    if (!product) {
      return response.status(400).json({ error: 'Uno de los productos ya no está disponible.' })
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      return response.status(400).json({ error: 'La cantidad de un producto no es válida.' })
    }

    normalizedItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      lineTotal: roundCurrency(product.price * quantity),
    })
  }

  const subtotal = roundCurrency(
    normalizedItems.reduce((sum, item) => sum + item.lineTotal, 0),
  )
  const shipping = getShippingCost(subtotal)
  const total = roundCurrency(subtotal + shipping)
  const orderId = `MA-${Date.now().toString(36).toUpperCase()}`

  return response.status(201).json({
    orderId,
    items: normalizedItems,
    subtotal,
    shipping,
    total,
    createdAt: new Date().toISOString(),
  })
})

export default router
