import type { CreditRequest } from "../../enterprise/entities/credit-request";

export interface CreditRequestsRepository {
  findById(id: string): Promise<CreditRequest | null>
  create(data: CreditRequest): Promise<void>
  save(data: CreditRequest): Promise<void>
}