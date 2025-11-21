import * as Fastify from 'fastify';
import { nanoid } from 'nanoid';

const butterfliesApi: Fastify.FastifyPluginCallback = function (
  fastify,
  _options,
  done,
) {
  fastify.get('/api/butterflies', async function (_request, reply) {
    const butterflies = await fastify.prisma.butterflies.findMany();
    reply.send(butterflies);
  });

  fastify.get<{
    Params: {
      id: string;
    };
  }>('/api/butterflies/:id', async function (request, reply) {
    // TODO: validate request params
    // TODO: handle not found
    const butterfly = await fastify.prisma.butterflies.findFirst({
      where: { id: request.params.id },
    });
    reply.send(butterfly);
  });

  fastify.post<{
    Body: {
      commonName: string;
      species: string;
      article: string;
    };
  }>('/api/butterflies', async function (request, reply) {
    // TODO: validate request body and return proper response
    // TODO: validate data (e.g. non-empty strings, length limits, valid URL for article)
    const newButterfly = {
      id: nanoid(),
      ...request.body,
    };
    await fastify.prisma.butterflies.create({ data: newButterfly });

    reply.status(201).send(newButterfly);
  });

  done();
};

export default butterfliesApi;
