import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { SearchCheckInService } from '../check-ins/search-check-in'

export function makeSearchCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const usersRepository = new PrismaUsersRepository()

  const service = new SearchCheckInService(checkInsRepository, usersRepository)

  return service
}
