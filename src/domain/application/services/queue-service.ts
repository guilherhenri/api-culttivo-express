export interface QueueService {
  enqueue(creditRequestId: string): Promise<void>
}