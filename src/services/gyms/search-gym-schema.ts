import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

export const gymSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  phone: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
})
const searchResponseSchema = z.object({
  data: z.array(gymSchema).optional(),
})

export const { schemas: searchGymSchemas, $ref } = buildJsonSchemas(
  {
    searchResponseSchema,
  },
  {
    $id: 'searchGymSchema',
  },
)
