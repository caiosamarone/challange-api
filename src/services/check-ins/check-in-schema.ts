import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const checkInRequestSchema = z.object({
  userId: z.string(),
})
const checkInResponseSchema = z.object({
  message: z.string(),
})
export type CheckInInput = z.infer<typeof checkInRequestSchema>

export const { schemas: checkInSchemas, $ref } = buildJsonSchemas(
  {
    checkInRequestSchema,
    checkInResponseSchema,
  },
  {
    $id: 'checkInUserSchema',
  },
)
