export const fetchAllUsers = async function () {
  return await this.prisma.users.findMany();
};

export const fetchUserById = async function (id: string) {
  return await this.prisma.users.findFirst({
    where: { id },
  });
};

export const createUser = async function (data: {
  id: string;
  username: string;
}) {
  return await this.prisma.users.create({ data });
};

export const fetchUserRatings = async function (id: string) {
  return await this.prisma.users.findFirst({
    where: { id },
    include: {
      ratings: {
        orderBy: { rating: 'desc' },
        select: {
          rating: true,
          butterfly: true,
        },
      },
    },
  });
};
