import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';
const prisma = new PrismaClient();


async function main() {

  const deletesystemSettings = await prisma.system_settings.deleteMany();
const systemSettingsPositions = await prisma.system_settings.createMany({
    data: [
      {
      setting: 'regional_director',
      value: '',
    },
    {
      setting: 'noted_by',
      value: '',
    },
    ]
  })
  const systemSettingsADMCounter = await prisma.system_settings.create({
    data: {
      setting: 'adm_counter',
      value: '0',
    },
  })
  const systemSettingsROXCounter = await prisma.system_settings.create({
    data: {
      setting: 'rox_counter',
      value: '0',
    },
  })
  const defaultUser = await prisma.users.create({
      data: {
          name_first: 'IT Admin',
          name_last: 'IT Admin',
          name_middle: 'IT Admin',
          password: '$2a$10$1sP5hzSSwwPnUZeIiQu4L.wH.MS2pEgieqYwmq2Z2.4hIs0qcy4vq',
          position: 'it-admin',
          user_name: 'it_admin',
          user_id: uuid(),
      }
  })

// const systemSettings = await prisma.system_settings.upsert({
//     where: { email: 'bob@prisma.io' },
//     update: {},
//     create: {
//       email: 'bob@prisma.io',
//       name: 'Bob',
//       posts: {
//         create: [
//           {
//             title: 'Follow Prisma on Twitter',
//             content: 'https://twitter.com/prisma',
//             published: true,
//           },
//           {
//             title: 'Follow Nexus on Twitter',
//             content: 'https://twitter.com/nexusgql',
//             published: true,
//           },
//         ],
//       },
//     },
//   })

//   console.log({ systemSettings })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })