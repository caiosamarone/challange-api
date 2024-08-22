import { GymNotFoundError } from '@/services/errors/gym-not-found'
import { makeUpdateGymService } from '@/services/factories/make-update-gym-service'
import { updateGymParamsSchema, updateRequestSchema } from '@/services/gyms/update-gym-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const { title, description, phone } = updateRequestSchema.parse(request.body)
  const { id } = updateGymParamsSchema.parse(request.params)
  try {
    const updateGymService = makeUpdateGymService()

    await updateGymService.execute({
      title,
      description,
      id,
      phone,
    })
  } catch (err) {
    if (err instanceof GymNotFoundError) {
      return reply.status(404).send({
        message: err.message,
      })
    }
    throw err
  }

  return reply.status(204).send()
}
