import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async update(data: Prisma.UserCreateInput) {
    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })
    return user
  }
  async delete(userId: string) {
    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    })
    return !!user.id
  }
  async getAll() {
    const users = await prisma.user.findMany()
    return users
  }
  async create({ email, name, passoword_hash }: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passoword_hash,
      },
    })
    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }
  async findByUserId(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    return user
  }
}
