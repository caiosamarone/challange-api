import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const checkInRequestSchema = z.object({
  gymId: z.string(),
  userId: z.string(),
})
const checkInResponseSchema = z.object({
  message: z.string(),
})
export type checkInInput = z.infer<typeof checkInRequestSchema>

export const { schemas: checkInSchemas, $ref } = buildJsonSchemas(
  {
    checkInRequestSchema,
    checkInResponseSchema,
  },
  {
    $id: 'checkInUserSchema',
  },
)
