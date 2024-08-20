import { $ref } from '@/services/authenticate-schema'
import { authenticate } from './controllers/authenticate'
import { register } from './controllers/register'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post(
    '/sessions',
    {
      schema: {
        tags: ['Users'],
        body: $ref('authRequestSchema'),
        response: {
          200: {
            description: 'Sucesso',
            type: 'string',
            example: 'world',
          },
        },
      },
      preHandler: [],
    },
    authenticate,
  )
  app.get(
    '/hello-word',
    {
      schema: {
        tags: ['Hello'],
        response: {
          200: {
            description: 'Sucesso',
            type: 'string',
            example: 'world',
          },
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send('ola mundop')
    },
  )
}
