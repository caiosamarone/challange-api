import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { UserNotFoundError } from '@/services/errors/user-not-found'

import { makeSearchCheckInService } from '@/services/factories/make-search-check-in-service'

export async function searchCheckin(request: FastifyRequest, reply: FastifyReply) {
  const searchCheckInParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const { userId } = searchCheckInParamsSchema.parse(request.params)

  try {
    const checkInService = makeSearchCheckInService()
    const { checkIn } = await checkInService.execute({
      userId,
    })

    return reply.status(200).send({
      checkIn: { ...checkIn },
    })
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return reply.status(404).send({
        message: err.message,
      })
    }

    throw err
  }
}
