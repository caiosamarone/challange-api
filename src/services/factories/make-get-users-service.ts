import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { SearchAllService } from '../users/searchAll'

export function makeSearchAllService() {
  const usersRepository = new PrismaUsersRepository()
  const registerService = new SearchAllService(usersRepository)

  return registerService
}
