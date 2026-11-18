import express from 'express'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import productsRouter from './routes/products.js'
import categoriesRouter from './routes/categories.js'
import ordersRouter from './routes/orders.js'

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
const rootDirectory = path.resolve(currentDirectory, '..')
const isProduction = process.argv.includes('--prod')
const port = Number(process.env.PORT) || 3000

const app = express()
const httpServer = http.createServer(app)

app.disable('x-powered-by')
app.use(express.json())

app.get('/api/health', (request, response) => {
  response.json({ status: 'ok' })
})

app.use('/api/products', productsRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/orders', ordersRouter)

app.use('/api', (request, response) => {
  response.status(404).json({ error: 'Endpoint no encontrado.' })
})

if (isProduction) {
  const distDirectory = path.join(rootDirectory, 'dist')
  app.use(express.static(distDirectory))
  app.get('*', (request, response) => {
    response.sendFile(path.join(distDirectory, 'index.html'))
  })
} else {
  const { createServer: createViteServer } = await import('vite')
  const vite = await createViteServer({
    root: rootDirectory,
    server: {
      middlewareMode: true,
      hmr: { server: httpServer },
    },
    appType: 'spa',
  })
  app.use(vite.middlewares)
}

httpServer.listen(port, () => {
  const mode = isProduction ? 'production' : 'development'
  console.log(`MarkArte ${mode} server running at http://localhost:${port}`)
})
