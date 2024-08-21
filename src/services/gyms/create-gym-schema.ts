import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const createRequestSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  phone: z.string().optional(),
})
const createResponseSchema = z.object({
  message: z.string(),
})
export type CreateInput = z.infer<typeof createRequestSchema>

export const { schemas: createGymSchemas, $ref } = buildJsonSchemas(
  {
    createRequestSchema,
    createResponseSchema,
  },
  {
    $id: 'createGymSchema',
  },
)
