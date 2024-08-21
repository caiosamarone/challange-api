import { FastifyInstance } from 'fastify'
import { ZodError, z } from 'zod'

import { env } from './config/env'

import { authSchemas } from './services/users/authenticate-schema'
import { buildSwaggerOpenApi } from './config/swagger'
import { registerSchemas } from './services/users/register-schema'
import routesMapper from './utils/routes-mapper'

export default async function (app: FastifyInstance) {
  app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: 'Validation error.', issues: error.format() })
    }
    console.error(error)

    return reply.status(500).send({ message: 'Internal server error' })
  })

  authSchemas.forEach((schema) => app.addSchema(schema))
  registerSchemas.forEach((schema) => app.addSchema(schema))

  app.register(buildSwaggerOpenApi)

  routesMapper.forEach((route) => {
    app.register(route)
  })
  app.ready(() => {
    console.log(app.printRoutes())
  })
}
