import { InMemoryCreditRequestsRepository } from "../../../../test/repositories/in-memory-credit-requests-repository";
import { CreditRequest } from "../../enterprise/entities/credit-request";
import { AnalysisCreditRequestUseCase } from "./analysis-credit-request";

let inMemoryCreditRequestsRepository: InMemoryCreditRequestsRepository
let sut: AnalysisCreditRequestUseCase

describe('Analysis Credit Request (Use-case)', () => {
  beforeEach(() => {
    inMemoryCreditRequestsRepository = new InMemoryCreditRequestsRepository()
    sut = new AnalysisCreditRequestUseCase(inMemoryCreditRequestsRepository)
  })

  it('should approve a credit request which has the right parameters', async () => {
    const creditRequest = CreditRequest.create({
      producerName: 'Producer Test',
      producerDocument: '123.456.789-10',
      farmArea: 10_000,
      annualRevenue: 200_000,
      requestedAmount: 30_000,
    })
    await inMemoryCreditRequestsRepository.create(creditRequest)
    
    await sut.execute({
      id: creditRequest.id
    })

    expect(inMemoryCreditRequestsRepository.items[0].status).toEqual('APPROVED')
  })

  it('should reject a credit request when the requested amount is greater than allowed', async () => {
    const creditRequest = CreditRequest.create({
      producerName: 'Producer Test',
      producerDocument: '123.456.789-10',
      farmArea: 10_000,
      annualRevenue: 200_000,
      requestedAmount: 70_000,
    })
    await inMemoryCreditRequestsRepository.create(creditRequest)
    
    await sut.execute({
      id: creditRequest.id
    })

    expect(inMemoryCreditRequestsRepository.items[0]).toMatchObject({
      status: 'REJECTED',
      rejectionReason: 'Request more than 30% of annual revenue'
    })
  })

  it('should reject a credit request when the farm area is too small', async () => {
    const creditRequest = CreditRequest.create({
      producerName: 'Producer Test',
      producerDocument: '123.456.789-10',
      farmArea: 5,
      annualRevenue: 200_000,
      requestedAmount: 30_000,
    })
    await inMemoryCreditRequestsRepository.create(creditRequest)
    
    await sut.execute({
      id: creditRequest.id
    })

    expect(inMemoryCreditRequestsRepository.items[0]).toMatchObject({
      status: 'REJECTED',
      rejectionReason: 'Farm area is too small'
    })
  })

  it('should reject a credit request when the requested amount is lower than the minimum', async () => {
    const creditRequest = CreditRequest.create({
      producerName: 'Producer Test',
      producerDocument: '123.456.789-10',
      farmArea: 10_000,
      annualRevenue: 200_000,
      requestedAmount: 4_000,
    })
    await inMemoryCreditRequestsRepository.create(creditRequest)
    
    await sut.execute({
      id: creditRequest.id
    })

    expect(inMemoryCreditRequestsRepository.items[0]).toMatchObject({
      status: 'REJECTED',
      rejectionReason: 'Requested amount is lower than minimum value'
    })
  })
})