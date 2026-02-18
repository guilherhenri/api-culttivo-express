import { Worker, type Job } from "bullmq";
import { DrizzleCreditRequestsRepository } from "../database/repositories/drizzle-credit-requests-repository";
import { AnalysisCreditRequestUseCase } from "../../domain/application/use-cases/analysis-credit-request";

export const processCreditRequest = new Worker(
  'credit-requests', 
  async (job: Job<{ creditRequestId: string }, void>) => {
    const drizzleCreditRequestsRepository = new DrizzleCreditRequestsRepository()
    const analysisCreditRequestUseCase = new AnalysisCreditRequestUseCase(drizzleCreditRequestsRepository)

    const { creditRequestId } = job.data

    await analysisCreditRequestUseCase.execute({ id: creditRequestId })
  },
  { 
    connection: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT)
    }
  }
)