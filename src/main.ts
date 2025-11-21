import Fastify from 'fastify';
import butterfliesApi from './butterflies/api.js';
import usersApi from './users/api.js';
import prismaPlugin from '../prisma/prismaPlugin.js';

const fastify = Fastify({
  logger: true,
});

fastify.register(prismaPlugin);

fastify.register(butterfliesApi);
fastify.register(usersApi);

fastify.get('/', async function () {
  return { hello: 'suka' };
});

// TODO: use env variable for port
// TODO: separate server from app
fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
