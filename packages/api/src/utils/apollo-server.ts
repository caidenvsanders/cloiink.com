/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Apollo Imports
import { ApolloServer } from 'apollo-server-express';
import { PubSub } from 'apollo-server';

// JsonWebToken Imports
import jwt from 'jsonwebtoken';

// Subscription Constants Imports
import { IS_USER_ONLINE } from '../constants/Subscriptions';

// Export pubSub instance for publishing events
export const pubSub = new PubSub();

/**
 * Checks if client is authenticated by checking authorization key from req headers
 *
 * @param {obj} req
 */
const checkAuthorization = (token: string) => {
  return new Promise(async (resolve, reject) => {
    const authUser = await jwt.verify(token, process.env.SECRET as jwt.Secret);

    if (authUser) {
      resolve(authUser);
    } else {
      reject("Couldn't authenticate user");
    }
  });
};

/**
 * Creates an Apollo server and identifies if user is authenticated or not
 *
 * @param {obj} schema GraphQL Schema
 * @param {array} resolvers GraphQL Resolvers
 * @param {obj} models Mongoose Models
 */
export const createApolloServer = (
  schema: any,
  resolvers: any,
  prisma: any,
) => {
  return new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({ req, connection }) => {
      if (connection) {
        return connection.context;
      }

      let authUser;
      if (req.headers.authorization !== undefined) {
        const user = await checkAuthorization(
          req.headers['authorization'] as string,
        );
        if (user) {
          authUser = user;
        }
      }

      return Object.assign({ authUser }, prisma);
    },
    subscriptions: {
      onConnect: async (connectionParams: any, webSocket: any) => {
        // Check if user is authenticated
        if (connectionParams.authorization) {
          const user: any = await checkAuthorization(
            connectionParams.authorization,
          );

          // Publish user isOnline true
          pubSub.publish(IS_USER_ONLINE, {
            isUserOnline: {
              userId: user.id,
              isOnline: true,
            },
          });

          // Add authUser to socket's context, so we have access to it, in onDisconnect method
          return {
            authUser: user,
          };
        }

        return null;
      },
      onDisconnect: async (webSocket, context) => {
        // Get socket's context
        const c = await context.initPromise;
        if (c && c.authUser) {
          // Publish user isOnline false
          pubSub.publish(IS_USER_ONLINE, {
            isUserOnline: {
              userId: c.authUser.id,
              isOnline: false,
            },
          });

          // Update user isOnline to false in DB
          await prisma.user.update({
            where: { email: c.authUser.email },
            data: {
              isOnline: false,
            },
          });
        }
      },
    },
  });
};
