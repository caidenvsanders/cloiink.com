/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// React Imports
import { StrictMode } from 'react';
import { hydrate } from 'react-dom';

// CSS Frameworks & Animation Imports
import GlobalStyle from './css';

// React Component Imports
import App from './App';

hydrate(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
