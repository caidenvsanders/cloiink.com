/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// React Imports
import React, { createContext, useContext, useReducer } from 'react';

// Store Context Imports
import { messageReducer, messageInitialState } from './message';
import { authReducer, authInitialState } from './auth';

/**
 * React context for store
 */
const StoreContext = createContext(undefined);

/**
 * Combine initial states
 */
const store = {
  message: messageInitialState,
  auth: authInitialState,
};

/**
 * Combine reducers
 */
const reducers = (store, action) => ({
  message: messageReducer(store.message, action),
  auth: authReducer(store.auth, action),
});

/**
 * Store context provider
 */
export const StoreProvider = ({ children }) => {
  <StoreContext.Provider value={useReducer(reducers, store)}>
    {children}
  </StoreContext.Provider>;
};

/**
 * React hook for consuming store
 */
export const useStore = () => useContext(StoreContext);
