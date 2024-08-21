import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { GymNotFoundError } from '../errors/gym-not-found'
import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from '../errors/user-not-found'
import { CannotCheckInTwice } from '../errors/cannot-check-in-twice'

interface CheckInRequest {
  userId: string
  gymId: string
}
interface CheckInResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ gymId, userId }: CheckInRequest): Promise<CheckInResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new GymNotFoundError()
    }

    const user = await this.usersRepository.findByUserId(userId)
    if (!user) {
      throw new UserNotFoundError()
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())
    if (checkInOnSameDate) {
      throw new CannotCheckInTwice()
    }
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })
    return {
      checkIn,
    }
  }
}
