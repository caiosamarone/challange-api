import { $ref as createRef } from '@/services/gyms/create-gym-schema'
import { $ref as searchRef } from '@/services/gyms/search-gym-schema'

import { FastifyInstance } from 'fastify'

import { validateApiKey } from '../middlewares/validate-apikey'

import { create } from '../controllers/gyms/create.controller'
import { search } from '../controllers/gyms/search-all.controller'

export async function gymRoute(app: FastifyInstance) {
  app.post(
    '/gym',
    {
      schema: {
        tags: ['Gyms'],
        body: createRef('createRequestSchema'),
        response: {
          201: createRef('createResponseSchema'),
        },
        security: [
          {
            apiKey: [],
          },
        ],
      },
      preHandler: [validateApiKey],
    },
    create,
  )
  app.get(
    '/gym',
    {
      schema: {
        tags: ['Gyms'],
        response: {
          200: searchRef('searchResponseSchema'),
        },
        security: [
          {
            apiKey: [],
          },
        ],
      },
      preHandler: [validateApiKey],
    },
    search,
  )
}
