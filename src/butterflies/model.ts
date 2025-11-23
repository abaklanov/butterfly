export async function fetchAllButterflies() {
  return await this.prisma.butterflies.findMany();
}

export async function fetchButterflyById(id: string) {
  return await this.prisma.butterflies.findFirst({
    where: { id },
  });
}

export async function createButterfly(data: {
  commonName: string;
  species: string;
  article: string;
}) {
  return await this.prisma.butterflies.create({ data });
}

export async function addButterflyRating(data: {
  butterflyId: string;
  userId: string;
  rating: number;
}) {
  const { userId, butterflyId, rating } = data;
  return await this.prisma.ratings.upsert({
    where: {
      userId_butterflyId: {
        userId,
        butterflyId,
      },
    },
    update: {
      rating,
    },
    create: {
      userId,
      butterflyId,
      rating,
    },
  });
}
