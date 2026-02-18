CREATE TYPE "public"."status" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TABLE "credit_requests" (
	"id" uuid PRIMARY KEY NOT NULL,
	"producerName" varchar NOT NULL,
	"producerDocument" varchar NOT NULL,
	"farmArea" integer NOT NULL,
	"annualRevenue" integer NOT NULL,
	"requestedAmount" integer NOT NULL,
	"status" "status" NOT NULL,
	"rejectionReason" varchar,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
