import Fastify from 'fastify';
import butterfliesRoutes from './butterflies/routes.js';
import usersRoutes from './users/routes.js';
import prismaPlugin from '../prisma/prismaPlugin.js';

// TODO: add to env
const app = Fastify({
  logger: true,
});

await app.register(import('@fastify/swagger'));

await app.register(import('@fastify/swagger-ui'), {
  routePrefix: '/documentation',
});

app.register(prismaPlugin);

app.register(butterfliesRoutes);
app.register(usersRoutes);

app.get('/health-check', async function () {
  return { hello: 'world' };
});

// TODO: separate server from app
app.listen(
  { port: +process.env.SERVER_PORT, host: process.env.SERVER_HOST },
  function (err) {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  },
);
