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
  fastify.get('/api/butterflies/:id', handleGetButterflyById);
  fastify.post('/api/butterflies', handleCreateButterfly);
  fastify.post('/api/butterflies/:id/ratings', handleAddButterflyRating);

  done();
};

export default butterfliesRoutes;
