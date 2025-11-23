import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { nanoid } from 'nanoid';
import { fetchAllUsers } from './model.js';

export const handleGetAllUsers = async function (_request, reply) {
  // TODO: validate request
  const users = await this.prisma.users.findMany();
  reply.send(users);
};

export const handleGetUserById = async function (request, reply) {
  const user = await this.prisma.users.findFirst({
    where: { id: request.params.id },
  });
  if (!user) {
    reply.status(404).send({ message: 'User not found' });
    return;
  }
  reply.send(user);
};

export const handleCreateUser = async function (request, reply) {
  const newUser = {
    id: nanoid(),
    ...request.body,
  };
  try {
    await this.prisma.users.create({ data: newUser });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this username',
        );
        reply.status(400);
      }
    }
    throw e;
  }
  reply.status(201).send(newUser);
};

export const handleGetUserRatings = async function (request, reply) {
  //TODO: validate request params
  // TODO: validate body
  // TODO: handle not found
  const user = await this.prisma.users.findFirst({
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
};
