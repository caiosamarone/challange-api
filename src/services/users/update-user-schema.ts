import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const updateRequestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
})
const updateResponseSchema = z.object({
  data: z.object({
    name: z.string(),
    email: z.string(),
    userId: z.string(),
    created_at: z.date(),
  }),
})
export type UpdateInput = z.infer<typeof updateResponseSchema>

export const { schemas: updateSchemas, $ref } = buildJsonSchemas(
  {
    updateRequestSchema,
    updateResponseSchema,
  },
  {
    $id: 'updateSchema',
  },
)
