import request from 'supertest'
 
import { app } from '../../app'
import { db } from '../../database/drizzle-client'
import { creditRequests } from '../../database/schema'

describe('Create Credit Request (E2E)', () => {
  it('/credit-requests [POST]', async () => {
    const response = await request(app)
      .post('/credit-requests')
      .send({
        producerName: "Guilherme Henrique",
        producerDocument: "123.456.789-10",
        farmArea: 100,
        annualRevenue: 200_000,
        requestedAmount: 30_000
      })
      .expect(201)

    expect(response.body).toMatchObject({
      creditRequestId: expect.any(String)
    })

    const creditRequestsOnDatabase = await db.select().from(creditRequests)

    expect(creditRequestsOnDatabase.length).greaterThanOrEqual(1)
  })
})