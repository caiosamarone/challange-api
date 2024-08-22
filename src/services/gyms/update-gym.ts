import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'
import { GymNotFoundError } from '../errors/gym-not-found'

interface UpdateGymServiceRequest {
  title: string
  description: string | null
  phone: string | null
  id: string
}

interface UpdateGymServiceResponse {
  gym: Gym
}

export class UpdateGymService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ title, description, phone, id }: UpdateGymServiceRequest): Promise<UpdateGymServiceResponse> {
    const gymInsance = await this.gymsRepository.findById(id)

    if (!gymInsance) {
      throw new GymNotFoundError()
    }

    const gym = await this.gymsRepository.update({
      title,
      description,
      phone,
      id,
      latitude: 0,
      longitude: 0,
    })

    return {
      gym,
    }
  }
}
