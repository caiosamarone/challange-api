import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const checkInSchema = z.object({
  id: z.string(),
  created_at: z.date(),
})

const searchCheckInResponseSchema = z.object({
  checkIn: checkInSchema.nullable(),
})

export const { schemas: searchCheckInSchemas, $ref } = buildJsonSchemas(
  {
    searchCheckInResponseSchema,
  },
  {
    $id: 'searchCheckInUserSchema',
  },
)
