import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdateService } from '../users/update-user'

export function makeUpdateService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new UpdateService(usersRepository)

  return service
}
