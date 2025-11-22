import { beforeAll, afterEach, describe, expect, it } from 'vitest';
import Fastify from 'fastify';

import usersRoutes from './routes.js';
import prismaPlugin from '../../prisma/prismaPlugin.js';

let fastify;

beforeAll(async () => {
  console.log(process.env.DATABASE_URL);

  fastify = Fastify({
    logger: false,
  });
  await fastify.register(prismaPlugin);
  fastify.register(usersRoutes);

  fastify.listen({ port: process.env.SERVER_PORT }, function (err) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
});

describe('users API', () => {
  beforeAll(async () => {
    await fastify.prisma.users.deleteMany({});
  });
  afterEach(async () => {
    await fastify.prisma.users.deleteMany({});
  });
  describe('GET /api/users', () => {
    it('returns the list of users ', async () => {
      await fastify.prisma.users.createMany({
        data: [
          {
            id: 'user1',
            username: 'alice',
          },
          {
            id: 'user2',
            username: 'bob',
          },
        ],
      });
      const response = await fastify.inject({
        method: 'GET',
        url: '/api/users',
      });
      expect(response.statusCode).toBe(200);
      const users = JSON.parse(response.body);
      expect(users.length).toBe(2);
      expect(users[1].username).toBe('bob');
    });
  });
});
