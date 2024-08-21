import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCheckInService } from '@/services/factories/make-check-in-service'
import { CheckInInput } from '@/services/check-ins/check-in-schema'
import { z } from 'zod'

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
    throw err
  }
  return reply.status(201).send({
    message: 'Check-In realizado com sucesso!',
  })
}
