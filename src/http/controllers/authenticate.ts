import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'
import { AuthInput } from '@/services/authenticate-schema'

export async function authenticate(
  request: FastifyRequest<{ Body: AuthInput }>,
  reply: FastifyReply,
) {
  const { email, password } = request.body

  try {
    const authenticateService = makeAuthenticateService()
    await authenticateService.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      reply.status(401).send({ message: err.message })
    }
    throw err
  }
  console.log('ola')
  return reply.status(200).send({
    authToken: 'ey82378237',
  })
}
