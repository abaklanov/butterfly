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
  fastify.post('/api/butterflies', handleCreateButterfly);
  fastify.post('/api/butterflies/:id/ratings', handleAddButterflyRating);

  done();
};

export default butterfliesRoutes;
