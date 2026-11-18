import { Router } from 'express'
import { products } from '../data/products.js'

const router = Router()

router.get('/', (request, response) => {
  const query = String(request.query.q ?? '').trim().toLocaleLowerCase('es')
  const category = String(request.query.category ?? '').trim()

  const filteredProducts = products.filter((product) => {
    const searchableText = `${product.name} ${product.category}`.toLocaleLowerCase('es')
    const matchesQuery = !query || searchableText.includes(query)
    const matchesCategory = !category || product.category === category
    return matchesQuery && matchesCategory
  })

  response.json(filteredProducts)
})

router.get('/:id', (request, response) => {
  const product = products.find((candidate) => candidate.id === request.params.id)
  if (!product) {
    return response.status(404).json({ error: 'Producto no encontrado.' })
  }
  return response.json(product)
})

export default router
