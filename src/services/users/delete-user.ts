import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { CannotDeleteUserError } from '../errors/cannot-delete-user'
import { UserNotFoundError } from '../errors/user-not-found'

export class DeleteService {
  constructor(
    private usersRepository: UsersRepository,
    private checkInRepository: CheckInsRepository,
  ) {}

  async execute(userId: string): Promise<boolean> {
    const checkIn = await this.checkInRepository.findByUserId(userId)
    const user = await this.usersRepository.findByUserId(userId)

    if (checkIn?.id) {
      throw new CannotDeleteUserError()
    }
    if (!user) {
      throw new UserNotFoundError()
    }
    const success = await this.usersRepository.delete(userId)

    return success
  }
}
