import { build } from 'vite'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]

process.env.VITE_BASE_PATH ||= repositoryName ? `/${repositoryName}/` : '/mark_arte/'
process.env.VITE_STATIC_DEMO = 'true'

await build()
await import('./export-static-data.mjs')
