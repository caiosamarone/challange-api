import { FastifyReply, FastifyRequest } from 'fastify'

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'
import { checkPermission } from '@/utils/check-permission'
import { z } from 'zod'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = requestBodySchema.parse(request.body)

  const permission = checkPermission(email, password)
  if (permission === 'ADMIN') {
    return reply.status(200).send({
      permission: 'ADMIN',
      name: 'ADMIN',
      userId: 'ADMIN',
    })
  }

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
      permission: 'USER',
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      reply.status(401).send({ message: err.message })
    }
    throw err
  }
}
