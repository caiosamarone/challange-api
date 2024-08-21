import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { SearchAllService } from '../users/search-users'

export function makeSearchAllService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new SearchAllService(usersRepository)

  return service
}
