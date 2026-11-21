import { buildApp } from './app.js'

const DEFAULT_PORT = 3001
const parsedPort = Number(process.env.PORT)
const port = process.env.PORT && Number.isFinite(parsedPort) ? parsedPort : DEFAULT_PORT
const host = process.env.HOST || '127.0.0.1'

const app = buildApp({ logger: true })

try {
  await app.listen({ port, host })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
