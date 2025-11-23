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
  fastify.get('/api/users/:id', {
    handler: handleGetUserById,
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
  fastify.post('/api/users', {
    handler: handleCreateUser,
    schema: {
      body: {
        type: 'object',
        properties: {
          username: { type: 'string', minLength: 1 },
        },
        required: ['username'],
      },
    },
  });
  fastify.get('/api/users/:id/ratings', {
    handler: handleGetUserRatings,
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

  done();
};

export default usersRoutes;
