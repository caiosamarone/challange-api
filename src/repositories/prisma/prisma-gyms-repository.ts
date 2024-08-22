import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async searchMany() {
    const gyms = await prisma.gym.findMany({
      orderBy: {
        title: 'asc',
      },
    })

    return gyms
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async update(data: Prisma.GymUpdateInput) {
    const gym = await prisma.gym.update({
      where: {
        id: String(data.id),
      },
      data,
    })

    return gym
  }
}
