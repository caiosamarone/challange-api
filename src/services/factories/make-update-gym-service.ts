import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { UpdateGymService } from '../gyms/update-gym'

export function makeUpdateGymService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new UpdateGymService(gymsRepository)

  return service
}
