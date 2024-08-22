import { $ref as createRef } from '@/services/gyms/create-gym-schema'
import { $ref as searchRef } from '@/services/gyms/search-gym-schema'
import { $ref as updateRef } from '@/services/gyms/update-gym-schema'

import { FastifyInstance } from 'fastify'

import { validateApiKey } from '../middlewares/validate-apikey'

import { create } from '../controllers/gyms/create.controller'
import { search } from '../controllers/gyms/search-all.controller'
import { update } from '../controllers/gyms/update.controller'

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
  app.put(
    '/gym/:id',
    {
      schema: {
        tags: ['Gyms'],
        body: updateRef('updateRequestSchema'),
        response: {
          204: updateRef('updateResponseSchema'),
        },
        security: [
          {
            apiKey: [],
          },
        ],
      },
      preHandler: [validateApiKey],
    },
    update,
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
