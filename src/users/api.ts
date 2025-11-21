import * as Fastify from 'fastify';
import { nanoid } from 'nanoid';

const usersApi: Fastify.FastifyPluginCallback = function (
  fastify,
  _options,
  done,
) {
  fastify.get('/api/users', async function (_request, reply) {
    // TODO: validate request
    const users = await fastify.prisma.users.findMany();
    reply.send(users);
  });

  fastify.get<{
    Params: {
      id: string;
    };
  }>('/api/users/:id', async function (request, reply) {
    // TODO: validate request params
    // TODO: handle not found
    const user = await fastify.prisma.users.findFirst({
      where: { id: request.params.id },
    });
    reply.send(user);
  });

  fastify.post<{
    Body: {
      username: string;
    };
  }>('/api/users', async function (request, reply) {
    // TODO: validate request body and return proper response
    // TODO: avoid duplicate usernames
    // TODO: validate username rules (e.g. length, characters)
    const newUser = {
      id: nanoid(),
      ...request.body,
    };
    await fastify.prisma.users.create({ data: newUser });
    reply.status(201).send(newUser);
  });

  fastify.get<{
    Params: {
      id: string;
    };
  }>('/api/users/:id/ratings', async function (request, reply) {
    const user = await fastify.prisma.users.findFirst({
      where: { id: request.params.id },
      include: {
        ratings: {
          orderBy: { rating: 'desc' },
          select: {
            id: true,
            rating: true,
            butterfly: true,
          },
        },
      },
    });
    reply.send(user);
  });

  done();
};

export default usersApi;
