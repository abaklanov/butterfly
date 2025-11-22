export const fetchAllUsers = async function () {
  return await this.prisma.butterflies.findMany();
};

export const fetchUserById = async function (id: string) {
  return await this.prisma.butterflies.findFirst({
    where: { id },
  });
};

export const createUser = async function (data: {
  username: string;
  email: string;
}) {
  return await this.prisma.butterflies.create({ data });
};

export const fetchUserRatings = async function (id: string) {
  return await this.prisma.butterflies.findFirst({
    where: { id },
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
};
