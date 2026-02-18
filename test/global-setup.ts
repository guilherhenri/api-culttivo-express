import { GenericContainer } from 'testcontainers'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { Pool } from 'pg'
import { pool } from '../src/infra/database/drizzle-client'

const REDIS_IMAGE = 'redis:8.2.4-alpine'
const POSTGRES_IMAGE = 'postgres:18-alpine'

export async function setup() {
  const redisContainer = await new GenericContainer(REDIS_IMAGE)
      .withExposedPorts(6379)
      .start()
  const postgresContainer = await new GenericContainer(POSTGRES_IMAGE)
    .withExposedPorts(5432)
    .withEnvironment({
      POSTGRES_USER: 'test',
      POSTGRES_PASSWORD: 'test',
      POSTGRES_DB: 'test',
    })
    .start()

  process.env.DATABASE_HOST = postgresContainer.getHost()
  process.env.DATABASE_PORT = postgresContainer.getMappedPort(5432).toString()
  process.env.DATABASE_USER = 'test'
  process.env.DATABASE_PASSWORD = 'test'
  process.env.DATABASE_NAME = 'test'
  process.env.REDIS_HOST = redisContainer.getHost()
  process.env.REDIS_PORT = redisContainer.getMappedPort(6379).toString()

  const databaseURL = `postgres://test:test@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/test`
  
  const migrationPool = new Pool({
    connectionString: databaseURL,
  })
  const migrationClient = drizzle(migrationPool)
  await migrate(migrationClient, { migrationsFolder: './src/infra/database/migrations' })
  
  await migrationPool.end()

  return async () => {
    await pool.end()
    await Promise.all([redisContainer.stop(), postgresContainer.stop()])
  }
}