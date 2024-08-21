import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const registerRequestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})
const registerResponseSchema = z.object({
  message: z.string(),
})
export type CreateInput = z.infer<typeof registerRequestSchema>

export const { schemas: registerSchemas, $ref } = buildJsonSchemas(
  {
    registerRequestSchema,
    registerResponseSchema,
  },
  {
    $id: 'registerSchema',
  },
)
