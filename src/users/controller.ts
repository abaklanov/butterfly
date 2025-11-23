import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { nanoid } from 'nanoid';
import {
  fetchAllUsers,
  fetchUserById,
  createUser,
  fetchUserRatings,
} from './model.js';

export const handleGetAllUsers = async function (_request, reply) {
  const users = await fetchAllUsers.call(this);
  reply.send(users);
};

export const handleGetUserById = async function (request, reply) {
  const user = await fetchUserById.call(this, request.params.id);
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
    await createUser.call(this, newUser);
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
  // TODO: check user id
  const user = await fetchUserRatings.call(this, request.params.id);
  reply.send(user);
};
