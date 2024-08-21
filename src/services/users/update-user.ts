import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { CannotDeleteUserError } from '../errors/cannot-delete-user'
import { User, Prisma } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found'

export class UpdateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(userParam: Prisma.UserUpdateInput): Promise<User> {
    const userExists = await this.usersRepository.findByUserId(String(userParam.id))
    if (!userExists?.id) {
      throw new ResourceNotFoundError()
    }
    const user = await this.usersRepository.update(userParam)

    return user
  }
}
