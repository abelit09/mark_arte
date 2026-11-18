import { Router } from 'express'
import { categories } from '../data/products.js'

const router = Router()

router.get('/', (request, response) => {
  response.json(categories)
})

export default router
