import { CreditRequest } from "../../enterprise/entities/credit-request"
import type { CreditRequestsRepository } from "../repositories/credit-requests-repository"
import type { QueueService } from "../services/queue-service"

export interface CreateCreditRequestUseCaseRequest {
  producerName: string
  producerDocument: string
  farmArea: number
  annualRevenue: number
  requestedAmount: number
}

export interface CreateCreditRequestUseCaseResponse {
  creditRequest: CreditRequest
}

export class CreateCreditRequestUseCase {
  constructor(
    private readonly creditRequestsRepository: CreditRequestsRepository,
    private readonly queueService: QueueService
  ) {}

  async execute({
    producerName,
    producerDocument,
    farmArea,
    annualRevenue,
    requestedAmount,
  }: CreateCreditRequestUseCaseRequest): Promise<CreateCreditRequestUseCaseResponse> {
    const creditRequest = CreditRequest.create({
      producerName,
      producerDocument,
      farmArea,
      annualRevenue,
      requestedAmount,
    })

    await this.creditRequestsRepository.create(creditRequest)
    await this.queueService.enqueue(creditRequest.id)

    return { creditRequest }
  }
}