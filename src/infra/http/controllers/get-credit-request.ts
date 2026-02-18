import type { Request, Response } from 'express'
import { z } from 'zod'
import { DrizzleCreditRequestsRepository } from '../../database/repositories/drizzle-credit-requests-repository'
import { GetCreditRequestUseCase } from '../../../domain/application/use-cases/get-credit-request'
import { CreateRequestPresenter } from '../presenters/create-request-presenter'

const getCreditRequestParamsSchema = z.object({
  id: z.uuid(),
})

export async function getCreditRequest(req: Request, res: Response) {
  const { id } = getCreditRequestParamsSchema.parse(req.params)

  const drizzleCreditRequestsRepository = new DrizzleCreditRequestsRepository()

  const getCreditRequestUseCase = new GetCreditRequestUseCase(
    drizzleCreditRequestsRepository
  )

  const { creditRequest } = await getCreditRequestUseCase.execute({ id })

  return res.json({
    creditRequest: CreateRequestPresenter.toHTTP(creditRequest)
  })
}