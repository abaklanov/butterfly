import Fastify from 'fastify';
import butterfliesRoutes from './butterflies/routes.js';
import usersRoutes from './users/routes.js';
import prismaPlugin from '../prisma/prismaPlugin.js';

const fastify = Fastify({
  logger: true,
});

fastify.register(prismaPlugin);

fastify.register(butterfliesRoutes);
fastify.register(usersRoutes);

fastify.get('/health-check', async function () {
  return { hello: 'world' };
});

// TODO: use env variable for port and address
// TODO: separate server from app
fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
