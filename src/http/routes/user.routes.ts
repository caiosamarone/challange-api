import { $ref as authRef } from '@/services/users/authenticate-schema'

import { FastifyInstance } from 'fastify'

import { $ref as registerRef } from '@/services/users/register-schema'
import { register } from '../controllers/users/register.controller'
import { validateApiKey } from '../middlewares/validate-apikey'
import { authenticate } from '../controllers/users/authenticate.controller'

export async function userRoute(app: FastifyInstance) {
  app.post(
    '/users',
    {
      schema: {
        tags: ['Users'],
        body: registerRef('registerRequestSchema'),
        response: {
          201: registerRef('registerResponseSchema'),
        },
        security: [
          {
            apiKey: [],
          },
        ],
      },
      preHandler: [validateApiKey],
    },
    register,
  )
  app.post(
    '/users/login',
    {
      schema: {
        tags: ['Users'],
        body: authRef('authRequestSchema'),
        response: {
          200: authRef('authResponseSchema'),
        },
        security: [
          {
            apiKey: [],
          },
        ],
      },
      preHandler: [validateApiKey],
    },
    //@ts-ignore
    authenticate,
  )
}
