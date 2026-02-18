import { randomUUID } from 'node:crypto'

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type CreditRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface CreditRequestProps {
  id: string
  producerName: string
  producerDocument: string
  farmArea: number
  annualRevenue: number
  requestedAmount: number
  status:  CreditRequestStatus
  rejectionReason?: string
  createdAt: Date
  updatedAt?: Date
}

export class CreditRequest {
  private props: CreditRequestProps

  constructor(props: CreditRequestProps) {
    this.props = props
  }

  get id() {
    return this.props.id
  }

  get producerName() {
    return this.props.producerName
  }

  get producerDocument() {
    return this.props.producerDocument
  }

  get farmArea() {
    return this.props.farmArea
  }

  get annualRevenue() {
    return this.props.annualRevenue
  }

  get status() {
    return this.props.status
  }

  set status(status: CreditRequestStatus) {
    this.props.status = status
    this.touch()
  }

  get requestedAmount() {
    return this.props.requestedAmount
  }

  get rejectionReason(): string | undefined {
    return this.props.rejectionReason
  }

  set rejectionReason(reason: string) {
    this.props.rejectionReason = reason
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<CreditRequestProps, 'id' | 'status' | 'createdAt'>) {
    const creditRequest = new CreditRequest({
      ...props,
      id: props.id ?? randomUUID(),
      status: props.status ?? 'PENDING',
      createdAt: props.createdAt ?? new Date(),
    })

    return creditRequest
  }
}
