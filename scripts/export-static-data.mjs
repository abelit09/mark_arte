import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { categories, products } from '../server/data/products.js'

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = path.join(rootDirectory, 'dist', 'api')

await mkdir(outputDirectory, { recursive: true })

await Promise.all([
  writeFile(
    path.join(outputDirectory, 'products.json'),
    `${JSON.stringify(products, null, 2)}\n`,
  ),
  writeFile(
    path.join(outputDirectory, 'categories.json'),
    `${JSON.stringify(categories, null, 2)}\n`,
  ),
])

console.log(`Static catalog written to ${path.relative(rootDirectory, outputDirectory)}`)
