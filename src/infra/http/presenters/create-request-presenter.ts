import type { CreditRequest } from "../../../domain/enterprise/entities/credit-request";

export class CreateRequestPresenter {
  static toHTTP(raw: CreditRequest) {
    return {
      id: raw.id,
      producerName: raw.producerName,
      farmArea: raw.farmArea,
      annualRevenue: raw.annualRevenue,
      requestedAmount: raw.requestedAmount,
      status: raw.status,
      rejectionReason: raw.rejectionReason ?? null,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt ?? null,
    }
  }
}