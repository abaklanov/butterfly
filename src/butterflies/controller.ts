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
  console.log(request.params.id);
  const butterfly = await fetchButterflyById.call(this, request.params.id);
  console.log(butterfly);
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
    id: nanoid(),
    butterflyId: request.params.id,
    ...request.body,
  };
  addButterflyRating.call(this, newRating);

  reply.status(201).send(newRating);
};
