import Fastify from 'fastify';
import butterfliesRoutes from './butterflies/routes.js';
import usersRoutes from './users/routes.js';
import prismaPlugin from '../prisma/prismaPlugin.js';

const app = Fastify({
  logger: Boolean(process.env.FASTIFY_LOGGER),
});

app.register(import('@fastify/helmet'));

await app.register(import('@fastify/swagger'));

await app.register(import('@fastify/swagger-ui'), {
  routePrefix: '/documentation',
});

await app.register(prismaPlugin);

app.register(butterfliesRoutes);
app.register(usersRoutes);

app.get('/health-check', async function () {
  return { hello: 'world' };
});

app.listen(
  {
    port: +process.env.SERVER_PORT || 3000,
    host: process.env.SERVER_HOST || '0.0.0.0',
  },
  function (err) {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  },
);
