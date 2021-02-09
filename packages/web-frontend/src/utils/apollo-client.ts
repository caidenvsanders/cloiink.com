/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Apollo Imports
import {
  ApolloClient,
  ApolloLink,
  Observable,
  split,
  InMemoryCache,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { createUploadLink } from 'apollo-upload-client';

/**
 * Creates an Apollo Link that adds the authentication token to the request
 */
const createAuthLink = () => {
  const request = (operation: any) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  };

  return new ApolloLink(
    (operation: any, forward: any) =>
      new Observable((observer: any) => {
        let handle: any;
        Promise.resolve(operation)
          .then((oper: any) => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.ubsubscribe();
        };
      }),
  );
};

/**
 * Helper functions that handle error cases
 */
const handleErrors = () => {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(
        ({
          message,
          locations,
          path,
        }: {
          message: any;
          locations: any;
          path: any;
        }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
      );
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });
};

/**
 * Creates an Apollo Client
 *
 * @param {string} apiUrl GraphQL API Url
 * @param {string} websocketApiUrl GraphQL WebSocket API Url
 */
const createApolloClient = (apiUrl: string, websocketApiUrl: string) => {
  const cache = new InMemoryCache();

  const errorLink = handleErrors();
  const authLink = createAuthLink();
  const uploadLink: any = createUploadLink({ uri: apiUrl }); // Upload link also creates an HTTP link

  // Create WebSocket link
  const authToken = localStorage.getItem('token');
  const wsLink: any = new WebSocketLink({
    uri: websocketApiUrl,
    options: {
      timeout: 60000,
      reconnect: true,
      connectionParams: {
        authorization: authToken,
      },
    },
  });

  // Temporary fix for early websocket closure resulting in websocket connections not being instantiated
  // https://github.com/apollographql/subscriptions-transport-ws/issues/377
  wsLink.subscriptionClient.maxConnectTimeGenerator.duration = () =>
    wsLink.subscriptionClient.maxConnectTimeGenerator.max;

  // Split links so that we can send data to each link
  // depending on what kind of operation is being sent
  const terminatingLink = split(
    ({ query }: { query: any }) => {
      const { kind, operation }: any = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    uploadLink,
  );

  return new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, terminatingLink]),
    cache,
  });
};

export default createApolloClient;
