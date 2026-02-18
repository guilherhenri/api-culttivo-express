import type { CreditRequestsRepository } from "../../src/domain/application/repositories/credit-requests-repository";
import type { CreditRequest } from "../../src/domain/enterprise/entities/credit-request";

export class InMemoryCreditRequestsRepository implements CreditRequestsRepository {
  public items: CreditRequest[] = []

  async findById(id: string): Promise<CreditRequest | null> {
    return this.items.find((item) => item.id === id) ?? null
  }

  async create(data: CreditRequest): Promise<void> {
    this.items.push(data)
  }

  async save(data: CreditRequest): Promise<void> {
    this.items = this.items.map((item) => {
      if (item.id === data.id) {
        return data
      }

      return item
    })
  }
}