import { integer, pgTable, uuid, varchar, pgEnum, timestamp } from "drizzle-orm/pg-core";

export const creditRequestStatus = pgEnum('status', ['PENDING', 'APPROVED', 'REJECTED'])

export const creditRequests = pgTable('credit_requests', {
  id: uuid().primaryKey(),
  producerName: varchar().notNull(),
  producerDocument: varchar().notNull(),
  farmArea: integer().notNull(),
  annualRevenue: integer().notNull(),
  requestedAmount: integer().notNull(),
  status: creditRequestStatus().notNull(),
  rejectionReason: varchar(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp(),
})

export type CreditRequest = typeof creditRequests.$inferSelect