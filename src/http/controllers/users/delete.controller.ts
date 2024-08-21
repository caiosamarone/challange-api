import { CannotDeleteUserError } from '@/services/errors/cannot-delete-user'
import { UserNotFoundError } from '@/services/errors/user-not-found'
import { makeDeleteService } from '@/services/factories/make-delete-user-service'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const deleteUserParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const { userId } = deleteUserParamsSchema.parse(request.params)
  try {
    const deleteService = makeDeleteService()
    const success = await deleteService.execute(userId)
    if (success) {
      return reply.status(204).send()
    }
  } catch (err) {
    if (err instanceof CannotDeleteUserError) {
      return reply.status(400).send({
        message: err.message,
      })
    }
    if (err instanceof UserNotFoundError) {
      return reply.status(404).send({
        message: err.message,
      })
    }
    throw err
  }
}
