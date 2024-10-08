import { Gym, Prisma } from '@prisma/client'

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  searchMany(): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  update(data: Prisma.GymUpdateInput): Promise<Gym>
}
