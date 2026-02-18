import { InMemoryCreditRequestsRepository } from "../../../../test/repositories/in-memory-credit-requests-repository";
import { InMemoryQueueService } from "../../../../test/services/in-memory-queue-service";
import { CreateCreditRequestUseCase } from "./create-credit-request";

let inMemoryCreditRequestsRepository: InMemoryCreditRequestsRepository
let inMemoryQueueService: InMemoryQueueService
let sut: CreateCreditRequestUseCase

describe('Create Credit Request (Use-case)', () => {
  beforeEach(() => {
    inMemoryCreditRequestsRepository = new InMemoryCreditRequestsRepository()
    inMemoryQueueService = new InMemoryQueueService()
    sut = new CreateCreditRequestUseCase(inMemoryCreditRequestsRepository, inMemoryQueueService)
  })

  it('should be able to create a credit request and enqueue', async () => {
    const result = await sut.execute({
      producerName: 'Producer Test',
      producerDocument: '123.456.789-10',
      farmArea: 10_000,
      annualRevenue: 200_000,
      requestedAmount: 30_000,
    })

    expect(result.creditRequest).toMatchObject({
      id: expect.any(String),
      producerName: 'Producer Test',
      producerDocument: '123.456.789-10',
      farmArea: 10_000,
      annualRevenue: 200_000,
      requestedAmount: 30_000,
      status: 'PENDING',
      createdAt: expect.any(Date),
      updatedAt: undefined,
    })
    expect(inMemoryCreditRequestsRepository.items).toHaveLength(1)
    expect(inMemoryCreditRequestsRepository.items[0].id).toEqual(result.creditRequest.id)
    expect(inMemoryQueueService.queues.has('credit-requests')).toBeTruthy()
    expect(inMemoryQueueService.queues.get('credit-requests')![0]).toMatchObject({
      creditRequestId: result.creditRequest.id
    })
  })
})