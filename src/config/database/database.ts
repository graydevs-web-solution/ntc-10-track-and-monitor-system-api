// import mongoose from 'mongoose';
import log from '../../logger/index';
import { PrismaClient } from '@prisma/client'

// export default function databaseConfig() {
//   const databaseConnection = process.env.DATABASE_URL as string
//   const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
//   }

//   return mongoose.connect(databaseConnection, options).then(res => {
//     log.info('Database connected');
//   }).catch((error) => {
//     log.error("Database error", error);
//     process.exit(1);
//   });
// };

