import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const authRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
const authResponseSchema = z.object({
  authToken: z.string(),
})
export type AuthInput = z.infer<typeof authRequestSchema>

export const { schemas: authSchemas, $ref } = buildJsonSchemas({
  authRequestSchema,
})
