/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Apollo Imports
import { ApolloServer } from 'apollo-server-express';

// JsonWebToken Imports
import jwt from 'jsonwebtoken';

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
export const createApolloServer = (schema: any, resolvers: any) => {
  return new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({ req, connection }: { req: any; connection: any }) => {
      if (connection) {
        return connection.context;
      }

      let authUser;
      if (req.headers.authorization !== 'null') {
        const user = await checkAuthorization(req.headers['authorization']);
        if (user) {
          authUser = user;
        }
      }

      return Object.assign({ authUser });
    },
  });
};
