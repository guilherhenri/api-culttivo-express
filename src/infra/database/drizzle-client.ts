import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const databaseURL = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`

export const db = drizzle(databaseURL);
