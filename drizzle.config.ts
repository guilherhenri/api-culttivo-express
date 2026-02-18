import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';

const databaseURL = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`

export default defineConfig({
  out: './src/infra/database/migrations',
  schema: './src/infra/database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseURL,
  },
});
