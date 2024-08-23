import { $ref as createRef } from '@/services/check-ins/check-in-schema'
import { $ref as searchRef } from '@/services/check-ins/search-check-in-schema'

import { FastifyInstance } from 'fastify'

import { validateApiKey } from '../middlewares/validate-apikey'

import { makeCheckIn } from '../controllers/check-ins/check-in.controller'
import { search } from '../controllers/gyms/search-all.controller'
import { searchCheckin } from '../controllers/check-ins/search.controller'

export async function checkInRoute(app: FastifyInstance) {
  app.post(
    '/check-in/gym/:gymId',
    {
      schema: {
        tags: ['Check-Ins'],
        body: createRef('checkInRequestSchema'),
        response: {
          201: createRef('checkInResponseSchema'),
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
    makeCheckIn,
  )
  app.get(
    '/check-in/user/:userId',
    {
      schema: {
        tags: ['Check-Ins'],
        security: [
          {
            apiKey: [],
          },
        ],
      },
      preHandler: [validateApiKey],
    },
    searchCheckin,
  )
}
