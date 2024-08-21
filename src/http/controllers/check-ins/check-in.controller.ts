import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCheckInService } from '@/services/factories/make-check-in-service'
import { CheckInInput } from '@/services/check-ins/check-in-schema'
import { z } from 'zod'
import { GymNotFoundError } from '@/services/errors/gym-not-found'
import { UserNotFoundError } from '@/services/errors/user-not-found'
import { CannotCheckInTwice } from '@/services/errors/cannot-check-in-twice'

export async function makeCheckIn(request: FastifyRequest<{ Body: CheckInInput }>, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })
  const { userId } = request.body

  const { gymId } = createCheckInParamsSchema.parse(request.params)

  try {
    const checkInService = makeCheckInService()
    await checkInService.execute({
      gymId,
      userId,
    })
  } catch (err) {
    if (err instanceof CannotCheckInTwice) {
      return reply.status(400).send({
        message: err.message,
      })
    }
    if (err instanceof GymNotFoundError || err instanceof UserNotFoundError) {
      return reply.status(404).send({
        message: err.message,
      })
    }

    throw err
  }
  return reply.status(201).send({
    message: 'Check-In realizado com sucesso!',
  })
}
