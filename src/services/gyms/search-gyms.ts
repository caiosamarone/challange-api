import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface SearchGymsServiceResponse {
  gyms: Gym[]
}

export class SearchGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute(): Promise<SearchGymsServiceResponse> {
    const gyms = await this.gymsRepository.searchMany()

    return {
      gyms,
    }
  }
}
