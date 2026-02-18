import type { CreditRequestStatus } from "../../enterprise/entities/credit-request"
import type { CreditRequestsRepository } from "../repositories/credit-requests-repository"

export interface AnalysisCreditRequestUseCaseRequest {
  id: string
}

export type AnalysisCreditRequestUseCaseResponse = void

export class AnalysisCreditRequestUseCase {
  constructor(private readonly creditRequestsRepository: CreditRequestsRepository) {}

  async execute({ id }: AnalysisCreditRequestUseCaseRequest): Promise<AnalysisCreditRequestUseCaseResponse> {
    const creditRequest = await this.creditRequestsRepository.findById(id)

    if (!creditRequest) {
      throw new Error('Credit request not found')
    }

    const { status, rejectionReason } = this.evaluateCreditRequestEligibility({
      requestedAmount: creditRequest.requestedAmount,
      annualRevenue: creditRequest.annualRevenue,
      farmArea: creditRequest.farmArea,
    })

    creditRequest.status = status

    if (rejectionReason) {
      creditRequest.rejectionReason = rejectionReason
    }

    await this.creditRequestsRepository.save(creditRequest)
  }

  private evaluateCreditRequestEligibility({
    requestedAmount,
    annualRevenue,
    farmArea,
  }: { 
    requestedAmount: number,  
    annualRevenue: number, 
    farmArea: number 
  }): { status: 'APPROVED' | 'REJECTED', rejectionReason?: string } {
    if (requestedAmount > annualRevenue * 0.3) {
      return { 
        status: 'REJECTED', 
        rejectionReason: 'Request more than 30% of annual revenue'
      }
    }

    if (farmArea < 10) {
      return {
        status: 'REJECTED',
        rejectionReason: 'Farm area is too small'
      }
    }

    if (requestedAmount < 5000) {
      return { 
        status: 'REJECTED',
        rejectionReason: 'Requested amount is lower than minimum value'
      }
    }

    return { status: 'APPROVED' }
  }
}