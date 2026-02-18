import type { QueueService } from "../../src/domain/application/services/queue-service";

export class InMemoryQueueService implements QueueService {
  public queues: Map<string, Array<Record<string, unknown>>> = new Map()

  async enqueue(creditRequestId: string): Promise<void> {
    if (this.queues.has('credit-requests')) {
      this.queues.set('credit-requests', [
        ...this.queues.get('credit-requests')!,
        { creditRequestId }
      ])

      return
    }
    
    this.queues.set('credit-requests', [{ creditRequestId }])
  }
}