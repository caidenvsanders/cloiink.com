/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
