import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

export const updateGymParamsSchema = z.object({
  id: z.string().uuid(),
})

export const updateRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  phone: z.string(),
})
const updateResponseSchema = z.object({
  message: z.string(),
})

export const { schemas: updateGymSchemas, $ref } = buildJsonSchemas(
  {
    updateRequestSchema,
    updateResponseSchema,
  },
  {
    $id: 'updateGymSchema',
  },
)
