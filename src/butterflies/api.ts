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
  }>('/api/butterflies/:id', function (_request, reply) {
    // const butterflies = fastify.db.data.butterflies || [];
    // const butterfly = butterflies.find(
    //   (butterfly) => butterfly.id === request.params.id,
    // );
    // TODO: handle not found
    reply.send({ butterfly: {} });
  });

  fastify.post<{
    Body: {
      commonName: string;
      species: string;
      article: string;
    };
  }>('/api/butterflies', function (request, reply) {
    // TODO: validate request body and return proper response
    // TODO: validate data (e.g. non-empty strings, length limits, valid URL for article)
    const newButterfly = {
      id: nanoid(),
      ...request.body,
    };
    // fastify.db.data.butterflies.push(newButterfly);

    // fastify.db.write();
    reply.status(201).send({ butterfly: newButterfly });
  });

  done();
};

export default butterfliesApi;
