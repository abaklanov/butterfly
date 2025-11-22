import Fastify from 'fastify';
import butterfliesRoutes from './butterflies/routes.js';
import usersRoutes from './users/routes.js';
import prismaPlugin from '../prisma/prismaPlugin.js';

// TODO: add to env
const fastify = Fastify({
  logger: true,
});

fastify.register(prismaPlugin);

fastify.register(butterfliesRoutes);
fastify.register(usersRoutes);

fastify.get('/health-check', async function () {
  return { hello: 'world' };
});

// TODO: separate server from app
fastify.listen(
  { port: +process.env.SERVER_PORT, host: process.env.SERVER_HOST },
  function (err) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  },
);
