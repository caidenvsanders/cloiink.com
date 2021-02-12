/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// React Imports
import { StrictMode } from 'react';
import { hydrate } from 'react-dom';

// Apollo Imports
import { ApolloProvider } from '@apollo/client';
import createApolloClient from 'utils/apollo-client';

// CSS Frameworks & Animation Imports
import GlobalStyle from './css';

// Context Store Imports
import { StoreProvider } from 'store';

// React Component Imports
import App from './App';

// GraphQL HTTP URL
const API_URL = process.env.REACT_APP_API_URL as string;

// GraphQL WebSocket (subscriptions) URL.
// If its URL is not set in .env then it has same url, host, and pathname
const WEBSOCKET_API_URL = process.env.REACT_APP_WEBSOCKET_API_URL as string;
const websocketApiUrl = WEBSOCKET_API_URL
  ? (WEBSOCKET_API_URL as string)
  : API_URL?.replace('https://', 'ws://').replace('http://', 'ws://');

// Create an Apollo Client
const apolloClient = createApolloClient(API_URL, websocketApiUrl);

hydrate(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <StoreProvider>
        <GlobalStyle />
        <App />
      </StoreProvider>
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root'),
);
