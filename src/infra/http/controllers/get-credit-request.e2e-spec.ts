import request from 'supertest'
 
import { app } from '../../app'
import { db } from '../../database/drizzle-client'
import { creditRequests } from '../../database/schema'
import { randomUUID } from 'node:crypto'

describe('Create Credit Request (E2E)', () => {
  it('/credit-requests [POST]', async () => {
    const result = await db
      .insert(creditRequests)
      .values({
        id: randomUUID(),
        producerName: "Guilherme Henrique",
        producerDocument: "123.456.789-10",
        farmArea: 100,
        annualRevenue: 200_000,
        requestedAmount: 30_000,
        status: 'PENDING',
      })
      .returning()

    const creditRequestId = result[0].id

    const response = await request(app)
      .get(`/credit-requests/${creditRequestId}`)
      .send()
      .expect(200)

    expect(response.body).toMatchObject({
      creditRequest: {
        id: creditRequestId,
        producerName: "Guilherme Henrique",
        farmArea: 100,
        annualRevenue: 200_000,
        requestedAmount: 30_000,
        status: 'PENDING',
        rejectionReason: null,
        createdAt: expect.any(String),
        updatedAt: null
      }
    })
  })
})