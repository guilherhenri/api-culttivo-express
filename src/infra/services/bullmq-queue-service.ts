import { Queue } from "bullmq";
import type { QueueService } from "../../domain/application/services/queue-service";

export class BullMQQueueService implements QueueService {
  private creditRequestsQueue: Queue

  constructor() {
    this.creditRequestsQueue = new Queue('credit-requests', {
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      }
    })
  }

  async enqueue(creditRequestId: string): Promise<void> {
    await this.creditRequestsQueue.add(
      'process-credit-request', 
      { creditRequestId },
      { removeOnComplete: true, removeOnFail: true }
    )
  }
}