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
  // TODO: validate request params
  // TODO: handle not found
  const butterfly = await fetchButterflyById.call(this, request.params.id);
  reply.send(butterfly);
};

export const handleCreateButterfly = async function (request, reply) {
  // TODO: validate request body and return proper response
  // TODO: validate data (e.g. non-empty strings, length limits, valid URL for article)
  const newButterfly = {
    id: nanoid(),
    ...request.body,
  };
  createButterfly.call(this, newButterfly);

  reply.status(201).send(newButterfly);
};

export const handleAddButterflyRating = async function (request, reply) {
  // TODO: validate request params
  // TODO: validate request body and return proper response
  // TODO: validate data (e.g. rating range, existing userId and butterflyId)
  const newRating = {
    id: nanoid(),
    butterflyId: request.params.id,
    ...request.body,
  };
  addButterflyRating.call(this, newRating);

  reply.status(201).send(newRating);
};
