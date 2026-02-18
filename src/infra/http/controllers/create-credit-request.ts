import type { Request, Response } from 'express'
import { z } from 'zod'
import { DrizzleCreditRequestsRepository } from '../../database/repositories/drizzle-credit-requests-repository'
import { BullMQQueueService } from '../../services/bullmq-queue-service'
import { CreateCreditRequestUseCase } from '../../../domain/application/use-cases/create-credit-request'

const createCreditRequestBodySchema = z.object({
  producerName: z.string(),
  producerDocument: z.string(),
  farmArea: z.number(),
  annualRevenue: z.number(),
  requestedAmount: z.number(),
})

export async function createCreditRequest(req: Request, res: Response) {
  const { 
    producerName,
    producerDocument,
    farmArea,
    annualRevenue,
    requestedAmount,
  } = createCreditRequestBodySchema.parse(req.body)

  const drizzleCreditRequestsRepository = new DrizzleCreditRequestsRepository()
  const bullMQQueueService = new BullMQQueueService()

  const createCreditRequestUseCase = new CreateCreditRequestUseCase(
    drizzleCreditRequestsRepository, 
    bullMQQueueService
  )

  const { creditRequest } = await createCreditRequestUseCase.execute({
    producerName,
    producerDocument,
    farmArea,
    annualRevenue,
    requestedAmount
  })

  return res.status(201).json({
    creditRequestId: creditRequest.id
  })
}