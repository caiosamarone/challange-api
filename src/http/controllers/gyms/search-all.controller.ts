import { makeSearchGymsService } from '@/services/factories/make-get-gyms-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsService = makeSearchGymsService()

  const { gyms } = await searchGymsService.execute()

  return reply.status(200).send({
    data: gyms,
  })
}
