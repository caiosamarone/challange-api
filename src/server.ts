import fastify from 'fastify'
import app from './app'
import { env } from './config/env'
import buildServer from './app'

async function run() {
  const app = fastify()
  app.register(buildServer)
  try {
    await app
      .listen({
        port: env.PORT,
        host: '0.0.0.0',
      })
      .then(() => {
        console.log(`Server running at http://localhost:${env.PORT}`)
      })
  } catch (err) {
    app.log.error(err)
    console.error(err)
    process.exit(1)
  }
}
run()
