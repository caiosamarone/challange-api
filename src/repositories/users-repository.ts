import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findByUserId(userId: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  update(data: Prisma.UserUpdateInput): Promise<User>
  delete(userId: string): Promise<boolean>
  getAll(): Promise<User[] | []>
}
