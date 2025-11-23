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
  id: string;
  butterflyId: string;
  userId: string;
  rating: number;
}) {
  return await this.prisma.ratings.create({ data });
}
