import * as Fastify from 'fastify';
import { nanoid } from 'nanoid';

const usersApi: Fastify.FastifyPluginCallback = function (
  fastify,
  _options,
  done,
) {
  // Declare a route
  fastify.get('/api/users', async function (_request, reply) {
    // TODO: validate request
    const users = await fastify.prisma.users.findMany();
    reply.send(users);
  });

  fastify.get<{
    Params: {
      id: string;
    };
  }>('/api/users/:id', function (_request, reply) {
    // const users = fastify.db.data.users || [];
    // const user = users.find((user) => user.id === request.params.id);
    // TODO: handle not found
    reply.send({ user: {} });
  });

  fastify.post<{
    Body: {
      username: string;
    };
  }>('/api/users', function (request, reply) {
    // TODO: validate request body and return proper response
    // TODO: avoid duplicate usernames
    // TODO: validate username rules (e.g. length, characters)
    const newUser = {
      id: nanoid(),
      ...request.body,
    };
    // fastify.db.data.users.push(newUser);

    // fastify.db.write();
    reply.status(201).send({ user: newUser });
  });

  done();
};

export default usersApi;
