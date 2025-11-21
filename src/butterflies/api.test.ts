import { beforeAll, describe, expect, it } from 'vitest';
import Fastify from 'fastify';
import butterfliesRoutes from './routes.js';
import prismaPlugin from '../../prisma/prismaPlugin.js';

let fastify;

beforeAll(() => {
  console.log(process.env.DATABASE_URL);

  fastify = Fastify({
    logger: false,
  });
  fastify.register(prismaPlugin);
  fastify.register(butterfliesRoutes);
  fastify.listen({ port: 3000 }, function (err) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
});

describe('butterflies API', () => {
  describe('GET /api/butterflies', () => {
    it('returns the list of butterflies ', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/api/butterflies',
      });
      console.log(response.body);
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).length).toBeGreaterThan(0);
    });
    it('returns the a butterfly', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/api/butterflies/Hq4Rk_vOPMehRX2ar6LKX',
      });
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toBeDefined();
    });
  });
});
