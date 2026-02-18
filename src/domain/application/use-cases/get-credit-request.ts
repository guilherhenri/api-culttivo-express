import type { CreditRequest } from "../../enterprise/entities/credit-request"
import type { CreditRequestsRepository } from "../repositories/credit-requests-repository"

export interface GetCreditRequestUseCaseRequest {
  id: string
}

export interface GetCreditRequestUseCaseResponse {
  creditRequest: CreditRequest
}

export class GetCreditRequestUseCase {
  constructor(private readonly creditRequestsRepository: CreditRequestsRepository) {}

  async execute({ id }: GetCreditRequestUseCaseRequest): Promise<GetCreditRequestUseCaseResponse> {
    const creditRequest = await this.creditRequestsRepository.findById(id)

    if (!creditRequest) {
      throw new Error('Credit request not found')
    }

    return { creditRequest }
  }
}