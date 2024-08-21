import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const authRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
const authResponseSchema = z.object({
  name: z.string(),
  permission: z.enum(['ADMIN', 'USER']),
  userId: z.string()
})
export type AuthInput = z.infer<typeof authRequestSchema>

export const { schemas: authSchemas, $ref } = buildJsonSchemas({
  authRequestSchema,
  authResponseSchema
}, {
  $id: "authUserSchema"
})
