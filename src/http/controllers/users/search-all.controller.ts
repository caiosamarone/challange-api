import { makeSearchAllService } from '@/services/factories/make-get-users-service'

import { FastifyReply, FastifyRequest } from 'fastify'

export async function searchAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const searchAllService = makeSearchAllService()
    const { users } = await searchAllService.execute()
    return reply.status(200).send({
      data: users,
    })
  } catch (err) {
    throw err
  }
}
