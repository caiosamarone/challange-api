import { FastifyInstance } from 'fastify'
import { ZodError, z } from 'zod'

import { env } from './config/env'

import { authSchemas } from './services/users/authenticate-schema'
import { buildSwaggerOpenApi } from './config/swagger'
import { registerSchemas } from './services/users/register-schema'
import routesMapper from './utils/routes-mapper'
import { searchGymSchemas } from './services/gyms/search-gym-schema'
import { createGymSchemas } from './services/gyms/create-gym-schema'
import { checkInSchemas } from './services/check-ins/check-in-schema'
import { searchUsersSchemas } from './services/users/search-users-schema'

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
  searchGymSchemas.forEach((schema) => app.addSchema(schema))
  createGymSchemas.forEach((schema) => app.addSchema(schema))
  checkInSchemas.forEach((schema) => app.addSchema(schema))
  searchUsersSchemas.forEach((schema) => app.addSchema(schema))

  app.register(buildSwaggerOpenApi)

  routesMapper.forEach((route) => {
    app.register(route)
  })
  app.ready(() => {
    console.log(app.printRoutes())
  })
}
