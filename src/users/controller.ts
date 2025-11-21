import { nanoid } from 'nanoid';

export const handleGetAllUsers = async function (_request, reply) {
  // TODO: validate request
  const users = await this.prisma.users.findMany();
  reply.send(users);
};

export const handleGetUserById = async function (request, reply) {
  // TODO: validate request params
  // TODO: handle not found
  const user = await this.prisma.users.findFirst({
    where: { id: request.params.id },
  });
  reply.send(user);
};

export const handleCreateUser = async function (request, reply) {
  // TODO: validate request body and return proper response
  // TODO: avoid duplicate usernames
  // TODO: validate username rules (e.g. length, characters)
  const newUser = {
    id: nanoid(),
    ...request.body,
  };
  await this.prisma.users.create({ data: newUser });
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
