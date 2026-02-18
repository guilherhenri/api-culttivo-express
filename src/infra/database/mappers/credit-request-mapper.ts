import { CreditRequest } from "../../../domain/enterprise/entities/credit-request";
import type { CreditRequest as CreditRequestDrizzle } from "../schema";

export class CreditRequestMapper {
  static toDomain(raw: CreditRequestDrizzle): CreditRequest {
    return CreditRequest.create({
      id: raw.id,
      producerName: raw.producerName,
      producerDocument: raw.producerDocument,
      farmArea: raw.farmArea,
      annualRevenue: raw.annualRevenue,
      requestedAmount: raw.requestedAmount,
      status: raw.status,
      rejectionReason: raw.rejectionReason ?? undefined,
      createdAt: raw.createdAt ?? undefined,
      updatedAt: raw.updatedAt ?? undefined,
    })
  }

  static toDrizzle(raw: CreditRequest): CreditRequestDrizzle {
    return {
      id: raw.id,
      producerName: raw.producerName,
      producerDocument: raw.producerDocument,
      farmArea: raw.farmArea,
      annualRevenue: raw.annualRevenue,
      requestedAmount: raw.requestedAmount,
      status: raw.status,
      rejectionReason: raw.rejectionReason ?? null,
      createdAt: raw.createdAt ?? null,
      updatedAt: raw.updatedAt ?? null,
    }
  }
}