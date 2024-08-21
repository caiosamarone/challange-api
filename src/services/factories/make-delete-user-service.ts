import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteService } from '../users/delete-user'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeDeleteService() {
  const usersRepository = new PrismaUsersRepository()
  const checkInsRepository = new PrismaCheckInsRepository()
  const service = new DeleteService(usersRepository, checkInsRepository)

  return service
}
