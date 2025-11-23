import { beforeAll, afterEach, describe, expect, it, afterAll } from 'vitest';
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

  fastify.listen(function (err) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
});

afterAll(async () => {
  await fastify.close();
});

describe.skip('users API', () => {
  beforeAll(async () => {
    await fastify.prisma.butterflies.deleteMany({});
    await fastify.prisma.users.deleteMany({});
    await fastify.prisma.ratings.deleteMany({});
  });
  afterEach(async () => {
    await fastify.prisma.butterflies.deleteMany({});
    await fastify.prisma.users.deleteMany({});
    await fastify.prisma.ratings.deleteMany({});
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
  describe('GET /api/users/:id', () => {
    it('returns the user with the specified ID', async () => {
      await fastify.prisma.users.create({
        data: {
          id: 'user1',
          username: 'alice',
        },
      });
      const response = await fastify.inject({
        method: 'GET',
        url: '/api/users/user1',
      });
      expect(response.statusCode).toBe(200);
      const user = JSON.parse(response.body);
      expect(user.username).toBe('alice');
    });
    it('returns 404 for not found', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/api/users/nonexistentid',
      });
      expect(response.statusCode).toBe(404);
    });
    it('returns 400 for invalid ID', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/api/users/ ',
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe('POST /api/users', () => {
    it('creates a new user', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/api/users',
        payload: {
          username: 'charlie',
        },
      });
      expect(response.statusCode).toBe(201);
      const newUser = JSON.parse(response.body);
      expect(newUser.username).toBe('charlie');

      const userInDb = await fastify.prisma.users.findFirst({
        where: { id: newUser.id },
      });
      expect(userInDb).not.toBeNull();
      expect(userInDb.username).toBe('charlie');
    });
    it('returns 400 for invalid data', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/api/users',
        payload: {},
      });
      expect(response.statusCode).toBe(400);
    });
    it('returns 400 for duplicate username', async () => {
      await fastify.prisma.users.create({
        data: {
          id: 'user1',
          username: 'alice',
        },
      });
      const response = await fastify.inject({
        method: 'POST',
        url: '/api/users',
        payload: {
          username: 'alice',
        },
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe('GET /api/users/:id/ratings', () => {
    it('returns a list of ratings for the user', async () => {
      await fastify.prisma.butterflies.createMany({
        data: [
          {
            id: 'butterfly1',
            commonName: 'Monarch Butterfly',
            species: 'Danaus plexippus',
            article: 'https://en.wikipedia.org/wiki/Monarch_butterfly',
          },
          {
            id: 'butterfly2',
            commonName: 'Swallowtail Butterfly',
            species: 'Papilio machaon',
            article: 'https://en.wikipedia.org/wiki/Swallowtail_butterfly',
          },
        ],
      });
      await fastify.prisma.users.createMany({
        data: [
          {
            id: 'user1',
            username: 'alice',
          },
        ],
      });
      await fastify.prisma.ratings.createMany({
        data: [
          {
            userId: 'user1',
            butterflyId: 'butterfly1',
            rating: 4,
          },
          {
            userId: 'user1',
            butterflyId: 'butterfly2',
            rating: 5,
          },
        ],
      });
      const response = await fastify.inject({
        method: 'GET',
        url: '/api/users/user1/ratings',
      });
      expect(response.statusCode).toBe(200);
      const ratings = JSON.parse(response.body);
      expect(ratings.ratings.length).toBe(2);
      expect(ratings.ratings[0].rating).toBe(5);
    });

    it("responses with 400 if there's incorrect user id", async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/api/users//ratings',
      });
      expect(response.statusCode).toBe(400);
    });
  });
});
