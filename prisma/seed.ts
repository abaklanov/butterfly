import prisma from '../prisma/prisma.js';

console.log('Seeding database...');

async function main() {
  console.log('Creating users...');
  const users = await prisma.users.createMany({
    data: [
      {
        id: '-9aAFuyNIkpSzRMNux2BQ',
        username: 'iluvbutterflies',
      },
      {
        id: '15rKqk4vDp7V5vE1MYG3t',
        username: 'flutterby',
      },
      {
        id: '2rWtjZcs88ElPfRSSL3Zm',
        username: 'metamorphosize_me',
      },
    ],
    skipDuplicates: true,
  });

  console.log({ users });

  console.log('Creating butterflies...');
  const butterflies = await prisma.butterflies.createMany({
    data: [
      {
        id: 'Hq4Rk_vOPMehRX2ar6LKX',
        commonName: 'Zebra Swallowtail',
        species: 'Protographium marcellus',
        article: 'https://en.wikipedia.org/wiki/Protographium_marcellus',
      },
      {
        id: 'H7hhcEWLDsxyHN0cnDrBV',
        commonName: 'Plum Judy',
        species: 'Abisara echerius',
        article: 'https://en.wikipedia.org/wiki/Abisara_echerius',
      },
      {
        id: 'VJ5v4ZEQVL92XaaSl7xgD',
        commonName: 'Red Pierrot',
        species: 'Talicada nyseus',
        article: 'https://en.wikipedia.org/wiki/Talicada_nyseus',
      },
      {
        id: 'juX-MCpw0NUW1xh40xgVc',
        commonName: 'Texan Crescentspot',
        species: 'Anthanassa texana',
        article: 'https://en.wikipedia.org/wiki/Anthanassa_texana',
      },
      {
        id: 'HIoGrnyIiUeIvAyhaYpit',
        commonName: 'Guava Skipper',
        species: 'Phocides polybius',
        article: 'https://en.wikipedia.org/wiki/Phocides_polybius',
      },
      {
        id: 'HlvjJBL8BLw2HFETsr9Sv',
        commonName: 'Mexican Bluewing',
        species: 'Myscelia ethusa',
        article: 'https://en.wikipedia.org/wiki/Myscelia_ethusa',
      },
    ],
    skipDuplicates: true,
  });
  console.log({
    butterflies,
  });

  console.log('Creating ratings...');
  const ratings = await prisma.ratings.createMany({
    data: [
      {
        id: '1',
        butterflyId: 'Hq4Rk_vOPMehRX2ar6LKX',
        userId: '-9aAFuyNIkpSzRMNux2BQ',
        rating: 3,
      },
      {
        id: '2',
        butterflyId: 'H7hhcEWLDsxyHN0cnDrBV',
        userId: '-9aAFuyNIkpSzRMNux2BQ',
        rating: 5,
      },
      {
        id: '3',
        butterflyId: 'VJ5v4ZEQVL92XaaSl7xgD',
        userId: '-9aAFuyNIkpSzRMNux2BQ',
        rating: 4,
      },
    ],
    skipDuplicates: true,
  });
  console.log({ ratings });
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
