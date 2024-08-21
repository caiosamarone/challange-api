import { UsersRepository } from '@/repositories/users-repository'

import { User, Prisma } from '@prisma/client'

import { UserNotFoundError } from '../errors/user-not-found'

export class UpdateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(userParam: Prisma.UserUpdateInput): Promise<User> {
    const userExists = await this.usersRepository.findByUserId(String(userParam.id))
    if (!userExists?.id) {
      throw new UserNotFoundError()
    }
    const user = await this.usersRepository.update(userParam)

    return user
  }
}
