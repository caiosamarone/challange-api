import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'
import { AuthInput } from '@/services/users/authenticate-schema'

export async function makeCheckIn(
  request: FastifyRequest<{ Body: AuthInput }>,
  reply: FastifyReply,
) {
  const { email, password } = request.body

  try {
    const authenticateService = makeAuthenticateService()
    const {
      user: { name, id },
    } = await authenticateService.execute({
      email,
      password,
    })
    return reply.status(200).send({
      name,
      userId: id,
      permission: 'ADMIN',
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      reply.status(401).send({ message: err.message })
    }
    throw err
  }
}
