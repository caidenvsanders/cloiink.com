/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Action types
 */
export const SET_MESSAGE = 'SET_MESSAGE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

/**
 * Initial state
 */
export const messageInitialState = {
  content: {
    type: '',
    text: '',
    autoClose: true,
  },
};

/**
 * User reducer
 */
export const messageReducer = (state = messageInitialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        content: {
          type: action.payload.type,
          text: action.payload.text,
          autoClose: action.payload.autoClose,
        },
      };
    case CLEAR_MESSAGE: {
      return {
        ...state,
        ...messageInitialState,
      };
    }
    default:
      return state;
  }
};
