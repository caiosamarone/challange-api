import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async create({
    gym_id,
    user_id,
    validated_at,
  }: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      gym_id,
      user_id,
      validated_at: validated_at ? new Date(validated_at) : null,
      created_at: new Date(),
    } as CheckIn
    this.items.push(checkIn)
    return checkIn
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const checkInOnSameDate = this.items.find((item) => item.user_id === userId)

    if (!checkInOnSameDate) {
      return null
    }
    return checkInOnSameDate
  }
}
