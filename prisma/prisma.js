import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
// TODO: enable env variable
// TODO: doesn't it take from config file?
console.log(process.env.DATABASE_URL);
const connectionString = 'postgresql://postgres@localhost:5432/butterfly';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
export { prisma };
