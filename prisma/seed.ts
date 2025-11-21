import { prisma } from '../prisma/prisma.js';

console.log('Seeding database...');

async function main() {
  console.log('Creating users...');
  const user1 = await prisma.users.upsert({
    where: { username: 'iluvbutterflies' },
    update: {},
    create: {
      id: '-9aAFuyNIkpSzRMNux2BQ',
      username: 'iluvbutterflies',
    },
  });
  const user2 = await prisma.users.upsert({
    where: { username: 'flutterby' },
    update: {},
    create: {
      id: '15rKqk4vDp7V5vE1MYG3t',
      username: 'flutterby',
    },
  });
  const user3 = await prisma.users.upsert({
    where: { username: 'metamorphosize_me' },
    update: {},
    create: {
      id: '2rWtjZcs88ElPfRSSL3Zm',
      username: 'metamorphosize_me',
    },
  });

  console.log({ user1, user2, user3 });

  console.log('Creating butterflies...');
  const butterfly1 = await prisma.butterflies.create({
    data: {
      id: 'Hq4Rk_vOPMehRX2ar6LKX',
      commonName: 'Zebra Swallowtail',
      species: 'Protographium marcellus',
      article: 'https://en.wikipedia.org/wiki/Protographium_marcellus',
    },
  });
  const butterfly2 = await prisma.butterflies.create({
    data: {
      id: 'H7hhcEWLDsxyHN0cnDrBV',
      commonName: 'Plum Judy',
      species: 'Abisara echerius',
      article: 'https://en.wikipedia.org/wiki/Abisara_echerius',
    },
  });
  const butterfly3 = await prisma.butterflies.create({
    data: {
      id: 'VJ5v4ZEQVL92XaaSl7xgD',
      commonName: 'Red Pierrot',
      species: 'Talicada nyseus',
      article: 'https://en.wikipedia.org/wiki/Talicada_nyseus',
    },
  });
  const butterfly4 = await prisma.butterflies.create({
    data: {
      id: 'juX-MCpw0NUW1xh40xgVc',
      commonName: 'Texan Crescentspot',
      species: 'Anthanassa texana',
      article: 'https://en.wikipedia.org/wiki/Anthanassa_texana',
    },
  });
  const butterfly5 = await prisma.butterflies.create({
    data: {
      id: 'HIoGrnyIiUeIvAyhaYpit',
      commonName: 'Guava Skipper',
      species: 'Phocides polybius',
      article: 'https://en.wikipedia.org/wiki/Phocides_polybius',
    },
  });
  const butterfly6 = await prisma.butterflies.create({
    data: {
      id: 'HlvjJBL8BLw2HFETsr9Sv',
      commonName: 'Mexican Bluewing',
      species: 'Myscelia ethusa',
      article: 'https://en.wikipedia.org/wiki/Myscelia_ethusa',
    },
  });
  console.log({
    butterfly1,
    butterfly2,
    butterfly3,
    butterfly4,
    butterfly5,
    butterfly6,
  });
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
