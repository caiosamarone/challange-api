import { makeSearchGymsService } from '@/services/factories/make-get-gyms-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  try {
    const searchGymsService = makeSearchGymsService()

    const { gyms } = await searchGymsService.execute()
    return reply.status(200).send({
      data: gyms,
    })
  } catch (er) {
    throw er
  }
}
