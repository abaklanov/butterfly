import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { nanoid } from 'nanoid';
import {
  addButterflyRating,
  createButterfly,
  fetchAllButterflies,
  fetchButterflyById,
} from './model.js';

export const handleGetButterfly = async function (_request, reply) {
  const butterflies = await fetchAllButterflies.call(this);
  reply.send(butterflies);
};

export const handleGetButterflyById = async function (request, reply) {
  const butterfly = await fetchButterflyById.call(this, request.params.id);
  if (!butterfly) {
    reply.status(404).send({ message: 'Butterfly not found' });
    return;
  }
  reply.send(butterfly);
};

export const handleCreateButterfly = async function (request, reply) {
  const newButterfly = {
    id: nanoid(),
    ...request.body,
  };
  createButterfly.call(this, newButterfly);

  reply.status(201).send(newButterfly);
};

export const handleAddButterflyRating = async function (request, reply) {
  const newRating = {
    butterflyId: request.params.id,
    ...request.body,
  };
  try {
    await addButterflyRating.call(this, newRating);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2003') {
        console.log('Either butterfly or user do not exist');
        reply.status(400);
      }
    }
    throw e;
  }

  reply.status(201).send(newRating);
};
