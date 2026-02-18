import { eq } from "drizzle-orm";
import type { CreditRequestsRepository } from "../../../domain/application/repositories/credit-requests-repository";
import type { CreditRequest } from "../../../domain/enterprise/entities/credit-request";
import { db } from "../drizzle-client";
import { creditRequests } from "../schema";
import { CreditRequestMapper } from "../mappers/credit-request-mapper";

export class DrizzleCreditRequestsRepository implements CreditRequestsRepository {
  async findById(id: string): Promise<CreditRequest | null> {
    const result = await db
      .select()
      .from(creditRequests)
      .where(eq(creditRequests.id, id))
      .limit(1)

    const creditRequest = result[0]

    if (!result[0]) {
      return null
    }

    return CreditRequestMapper.toDomain(creditRequest)
  }

  async create(data: CreditRequest): Promise<void> {
    const creditRequest = CreditRequestMapper.toDrizzle(data)

    await db.insert(creditRequests).values(creditRequest).returning()
  }

  async save(data: CreditRequest): Promise<void> {
    const creditRequest = CreditRequestMapper.toDrizzle(data)

    await db.update(creditRequests).set(creditRequest).where(eq(creditRequests.id, data.id))
  }
}