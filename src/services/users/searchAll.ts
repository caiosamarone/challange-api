import { UsersRepository } from '@/repositories/users-repository'

import { User } from '@prisma/client'

interface SearchAllServiceResponse {
  users: User[]
}

export class SearchAllService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<SearchAllServiceResponse> {
    const users = await this.usersRepository.getAll()

    return {
      users,
    }
  }
}
