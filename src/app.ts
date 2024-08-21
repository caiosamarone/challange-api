import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { buildSwaggerOpenApi } from './config/swagger'

import routesMapper from './utils/routes-mapper'

import { buildSchemas } from './config/schemas'
import fastifyCors from '@fastify/cors'

export default async function (app: FastifyInstance) {
  app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: 'Validation error.', issues: error.format() })
    }
    console.error(error)

    return reply.status(500).send({ message: error.message })
  })

  app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: '*',
  })

  app.register(buildSchemas)
  app.register(buildSwaggerOpenApi)

  routesMapper.forEach((route) => {
    app.register(route)
  })
  app.ready(() => {
    console.log(app.printRoutes())
  })
}
