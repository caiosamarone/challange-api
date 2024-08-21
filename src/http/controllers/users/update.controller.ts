import { ResourceNotFoundError } from '@/services/errors/resource-not-found'
import { UserNotFoundError } from '@/services/errors/user-not-found'

import { makeUpdateService } from '@/services/factories/make-update-user-service'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateUserParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const { userId } = updateUserParamsSchema.parse(request.params)

  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
  })

  const { name, email } = requestBodySchema.parse(request.body)

  try {
    const updateService = makeUpdateService()
    const {
      name: nome,
      email: e_mail,
      id,
      created_at,
    } = await updateService.execute({
      name,
      email,
      id: userId,
    })
    return reply.status(204).send({
      data: {
        name: nome,
        email: e_mail,
        id,
        created_at,
      },
    })
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      reply.status(404).send({ message: err.message })
    }
    throw err
  }
}
