import * as Fastify from 'fastify';
import {
  handleCreateButterfly,
  handleGetButterfly,
  handleGetButterflyById,
  handleAddButterflyRating,
} from './controller.js';

const butterfliesRoutes: Fastify.FastifyPluginCallback = function (
  fastify,
  _options,
  done,
) {
  fastify.get('/api/butterflies', handleGetButterfly);
  fastify.get('/api/butterflies/:id', {
    handler: handleGetButterflyById,
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', minLength: 1 },
        },
        required: ['id'],
      },
    },
  });
  fastify.post('/api/butterflies', {
    handler: handleCreateButterfly,
    schema: {
      body: {
        type: 'object',
        properties: {
          commonName: { type: 'string', minLength: 1 },
          species: { type: 'string', minLength: 1 },
          article: { type: 'string', format: 'uri' },
        },
        required: ['commonName', 'species', 'article'],
      },
    },
  });
  fastify.post('/api/butterflies/:id/ratings', {
    handler: handleAddButterflyRating,
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', minLength: 1 },
        },
        required: ['id'],
      },
      body: {
        type: 'object',
        properties: {
          userId: { type: 'string', minLength: 1 },
          rating: { type: 'number', minimum: 1, maximum: 5 },
        },
        required: ['userId', 'rating'],
      },
    },
  });

  done();
};

export default butterfliesRoutes;
