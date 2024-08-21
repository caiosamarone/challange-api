import { makeCreateGymService } from '@/services/factories/make-create-gym-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
  })

  const { title, description, phone } = createGymBodySchema.parse(request.body)

  const createGymService = makeCreateGymService()

  await createGymService.execute({
    title,
    description,
    phone,
  })

  return reply.status(201).send()
}
