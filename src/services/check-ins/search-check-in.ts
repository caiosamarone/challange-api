import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from '../errors/user-not-found'

interface SearchCheckInRequest {
  userId: string
}
interface SearchCheckInResponse {
  checkIn: CheckIn | null
}

export class SearchCheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ userId }: SearchCheckInRequest): Promise<SearchCheckInResponse> {
    const user = await this.usersRepository.findByUserId(userId)
    if (!user) {
      throw new UserNotFoundError()
    }

    const checkIn = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    return {
      checkIn,
    }
  }
}
