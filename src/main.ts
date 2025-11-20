import Fastify from 'fastify';
import butterfliesApi from './butterflies/api.js';
import usersApi from './users/api.js';

const fastify = Fastify({
  logger: true,
});

fastify.register(butterfliesApi);
fastify.register(usersApi);

// TODO: use env variable for port
// TODO: separate server from app
fastify.listen({ port: 3000 }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
