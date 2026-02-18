import { InMemoryCreditRequestsRepository } from "../../../../test/repositories/in-memory-credit-requests-repository";
import { CreditRequest } from "../../enterprise/entities/credit-request";
import { GetCreditRequestUseCase } from "./get-credit-request";

let inMemoryCreditRequestsRepository: InMemoryCreditRequestsRepository
let sut: GetCreditRequestUseCase

describe('Get Credit Request (Use-case)', () => {
  beforeEach(() => {
    inMemoryCreditRequestsRepository = new InMemoryCreditRequestsRepository()
    sut = new GetCreditRequestUseCase(inMemoryCreditRequestsRepository)
  })

  it('should be able to get a credit request by id', async () => {
    const creditRequest = CreditRequest.create({
      producerName: 'Producer Test',
      producerDocument: '123.456.789-10',
      farmArea: 10_000,
      annualRevenue: 200_000,
      requestedAmount: 30_000,
    })
    await inMemoryCreditRequestsRepository.create(creditRequest)

    const result = await sut.execute({
      id: creditRequest.id
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
  })

  it('should not be able to get a credit request that does not exist', async () => {
    expect(() => 
      sut.execute({
        id: 'invalid-credit-request-id'
      })
    ).rejects.toThrowError('Credit request not found')
  })
})