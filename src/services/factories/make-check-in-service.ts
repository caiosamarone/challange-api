import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInService } from '../check-ins/check-in'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const usersRepository = new PrismaUsersRepository()

  const service = new CheckInService(checkInsRepository, gymsRepository, usersRepository)

  return service
}
