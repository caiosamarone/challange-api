import { $ref as authRef } from '@/services/users/authenticate-schema'
import { $ref as registerRef } from '@/services/users/register-schema'
import { $ref as searchUsersRef } from '@/services/users/search-users-schema'
import { FastifyInstance } from 'fastify'

import { register } from '../controllers/users/register.controller'
import { validateApiKey } from '../middlewares/validate-apikey'
import { authenticate } from '../controllers/users/authenticate.controller'
import { searchAll } from '../controllers/users/search-all.controller'
import { deleteUser } from '../controllers/users/delete.controller'

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
  app.get(
    '/users',
    {
      schema: {
        tags: ['Users'],
        response: {
          200: searchUsersRef('searchResponseSchema'),
        },
        security: [
          {
            apiKey: [],
          },
        ],
      },
      preHandler: [validateApiKey],
    },
    searchAll,
  )
  app.delete(
    '/users/:userId',
    {
      schema: {
        tags: ['Users'],
        response: {
          204: {},
        },
        security: [
          {
            apiKey: [],
          },
        ],
      },
      preHandler: [validateApiKey],
    },
    deleteUser,
  )
  app.post(
    '/login',
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
