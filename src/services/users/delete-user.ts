import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { CannotDeleteUserError } from '../errors/cannot-delete-user'

export class DeleteService {
  constructor(
    private usersRepository: UsersRepository,
    private checkInRepository: CheckInsRepository,
  ) {}

  async execute(userId: string): Promise<boolean> {
    const checkIn = await this.checkInRepository.findByUserId(userId)
    console.log(checkIn)
    if (checkIn?.id) {
      throw new CannotDeleteUserError()
    }
    const success = await this.usersRepository.delete(userId)

    return success
  }
}
