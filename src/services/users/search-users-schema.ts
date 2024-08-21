import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  created_at: z.date(),
})
const searchResponseSchema = z.object({
  data: z.array(userSchema).optional(),
})

export const { schemas: searchUsersSchemas, $ref } = buildJsonSchemas(
  {
    searchResponseSchema,
  },
  {
    $id: 'searchUsersSchema',
  },
)
