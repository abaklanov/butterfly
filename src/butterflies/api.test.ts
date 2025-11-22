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

  fastify.listen({ port: process.env.SERVER_PORT }, function (err) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
});

describe('butterflies API', () => {
  beforeAll(async () => {
    await fastify.prisma.butterflies.deleteMany({});
  });
  afterEach(async () => {
    await fastify.prisma.butterflies.deleteMany({});
  });
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
      expect(response.statusCode).toBe(200);
      const butterflies = JSON.parse(response.body);
      expect(butterflies.length).toBe(2);
      expect(butterflies[1].commonName).toBe('Swallowtail Butterfly');
    });
  });

  describe('GET /api/butterflies/:id', () => {
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
  describe('POST /api/butterflies', () => {
    it('creates a butterfly', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/api/butterflies',
        payload: {
          commonName: 'Monarch Butterfly',
          species: 'Danaus plexippus',
          article: 'https://en.wikipedia.org/wiki/Monarch_butterfly',
        },
      });
      expect(response.statusCode).toBe(201);
      const butterfly = JSON.parse(response.body);
      expect(butterfly.commonName).toBe('Monarch Butterfly');
    });
  });
  describe('POST /api/butterflies/:id/ratings', () => {
    it('adds a rating to a butterfly', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/api/butterflies/Hq4Rk_vOPMehRX2ar6LKX/ratings',
        payload: {
          rating: 4,
          userId: '-9aAFuyNIkpSzRMNux2BQ',
        },
      });
      expect(response.statusCode).toBe(201);
      const rating = JSON.parse(response.body);
      expect(rating.rating).toBe(4);
      expect(rating.butterflyId).toBe('Hq4Rk_vOPMehRX2ar6LKX');
      expect(rating.userId).toBe('-9aAFuyNIkpSzRMNux2BQ');
    });
  });
});
