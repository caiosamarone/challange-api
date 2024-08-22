import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import { checkInSchemas } from '@/services/check-ins/check-in-schema'
import { createGymSchemas } from '@/services/gyms/create-gym-schema'
import { searchGymSchemas } from '@/services/gyms/search-gym-schema'
import { authSchemas } from '@/services/users/authenticate-schema'
import { registerSchemas } from '@/services/users/register-schema'
import { searchUsersSchemas } from '@/services/users/search-users-schema'
import { updateSchemas } from '@/services/users/update-user-schema'
import { updateGymSchemas } from '@/services/gyms/update-gym-schema'

export async function buildSchemas(app: FastifyInstance) {
  authSchemas.forEach((schema) => app.addSchema(schema))
  registerSchemas.forEach((schema) => app.addSchema(schema))
  searchGymSchemas.forEach((schema) => app.addSchema(schema))
  createGymSchemas.forEach((schema) => app.addSchema(schema))
  updateGymSchemas.forEach((schema) => app.addSchema(schema))
  checkInSchemas.forEach((schema) => app.addSchema(schema))
  searchUsersSchemas.forEach((schema) => app.addSchema(schema))
  updateSchemas.forEach((schema) => app.addSchema(schema))
}

export default fastifyPlugin(buildSchemas)
