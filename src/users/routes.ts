import * as Fastify from 'fastify';
import {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleGetUserRatings,
} from './controller.js';

const usersRoutes: Fastify.FastifyPluginCallback = function (
  fastify,
  _options,
  done,
) {
  fastify.get('/api/users', handleGetAllUsers);
  fastify.get('/api/users/:id', handleGetUserById);
  fastify.post('/api/users', handleCreateUser);
  fastify.get('/api/users/:id/ratings', handleGetUserRatings);

  done();
};

export default usersRoutes;
