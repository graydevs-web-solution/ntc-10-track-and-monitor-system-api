import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {

  const deletesystemSettings = await prisma.system_settings.deleteMany();
  const systemSettingsRD = await prisma.system_settings.create({
    data: {
      setting: 'regional_director',
      value: '',
    },
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