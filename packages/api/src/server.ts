/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Express Imports
import express from 'express';

// Apollo Imports
import { createApolloServer } from './utils/apollo-server';

// Prisma Imports
import { PrismaClient } from '@prisma/client';

// GraphQL Schema & Resolvers Imports
import schema from './schema';
import resolvers from './resolvers';

// Accessories Imports
import cors from 'cors';

// Dotenv Import
import * as dotenv from 'dotenv';

// Initialize Dotenv
dotenv.config();

// Initialize express application
const app = express();

// Initalize prisma client
const prisma = new PrismaClient();

// Set cors options and enable cors
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));

// Create an Apollo Server
const server = createApolloServer(schema, resolvers);
server.applyMiddleware({ app, path: '/graphql' });

// Create prisma client user
const createUser = async () => {
  // const myUser = await prisma.user.create({
  //   data: {
  //     fullName: 'Caiden Sanders',
  //     email: 'caidensanders@gmail.com',
  //     username: 'caidensanders',
  //     passwordResetToken: '',
  //     passwordResetTokenExpiry: '',
  //     password: 'mrbunny01',
  //     image: '',
  //     imagePublicId: '',
  //     coverImage: '',
  //     coverImagePublicId: '',
  //   },
  // });

  const myUser = await prisma.user.update({
    where: {
      id: 'ckkg5i2ev0000hwv3iqgc18bz',
    },
    data: {
      posts: {
        create: {
          title: 'my post',
          image: '',
          imagePublicId: '',
        },
      },
    },
  });

  return prisma.user.findUnique({
    where: {
      id: 'ckkg5i2ev0000hwv3iqgc18bz',
    },
    include: {
      posts: true,
    },
  });
};

const foo = async () => {
  console.log(await createUser());
};

foo();

// Listen to HTTP
const PORT = process.env.PORT ?? process.env.API_PORT;
app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT as string}`);
});
