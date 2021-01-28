/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Express Imports
import express from 'express';

// HTTP Imports
import { createServer } from 'http';

// Apollo Imports
import { createApolloServer } from './utils/apollo-server';

// Prisma Imports
import { createContext } from './utils/context';

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

// Set cors options and enable cors
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));

// Create an Apollo Server
const server = createApolloServer(schema, resolvers, createContext());
server.applyMiddleware({ app, path: '/graphql' });

// Create HTTP server and add subscriptions to it
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

// Listen to HTTP
const PORT = process.env.PORT ?? process.env.API_PORT;
httpServer.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT as string}`);
});
