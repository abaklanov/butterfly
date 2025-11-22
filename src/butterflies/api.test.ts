import { beforeAll, describe, expect, it } from 'vitest';
import Fastify from 'fastify';
import butterfliesRoutes from './routes.js';
import prismaPlugin from '../../prisma/prismaPlugin.js';
import { afterEach } from 'node:test';

let fastify;

beforeAll(async () => {
  console.log(process.env.DATABASE_URL);

  fastify = Fastify({
    logger: false,
  });
  await fastify.register(prismaPlugin);
  fastify.register(butterfliesRoutes);

  await fastify.prisma.butterflies.deleteMany({});
  await fastify.prisma.users.deleteMany({});

  fastify.listen({ port: process.env.SERVER_PORT }, function (err) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
});

afterEach(async () => {
  // Clean up database after each test if needed
  await fastify.prisma.butterflies.deleteMany({});
  await fastify.prisma.users.deleteMany({});
});

describe('butterflies API', () => {
  describe('GET /api/butterflies', () => {
    it('returns the list of butterflies ', async () => {
      await fastify.prisma.butterflies.createMany({
        data: [
          {
            id: 'Hq4Rk_vOPMehRX2ar6LKX',
            commonName: 'Monarch Butterfly',
            species: 'Danaus plexippus',
            article: 'https://en.wikipedia.org/wiki/Monarch_butterfly',
          },
          {
            id: 'B1cD3fGHIJkLmNoPqRsTu',
            commonName: 'Swallowtail Butterfly',
            species: 'Papilio machaon',
            article: 'https://en.wikipedia.org/wiki/Swallowtail_butterfly',
          },
        ],
      });
      const response = await fastify.inject({
        method: 'GET',
        url: '/api/butterflies',
      });
      console.log(response.body);
      expect(response.statusCode).toBe(200);
      const butterflies = JSON.parse(response.body);
      expect(butterflies.length).toBe(2);
      expect(butterflies[1].commonName).toBe('Swallowtail Butterfly');
    });

    it('returns a butterfly', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/api/butterflies/Hq4Rk_vOPMehRX2ar6LKX',
      });
      expect(response.statusCode).toBe(200);
      const butterfly = JSON.parse(response.body);
      expect(butterfly.commonName).toBe('Monarch Butterfly');
    });
  });
});
