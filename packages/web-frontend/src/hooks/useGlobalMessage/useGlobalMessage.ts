/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// React Context Store Imports
import { useStore } from 'store';
import { SET_MESSAGE } from 'store/message';

// Constant Imports
import { MessageType } from 'constants/MessageType';

/**
 * useGlobalMessage Hook
 *
 * React hook for disaptching global messages
 *
 * usage:
 *      const message = useGlobalMessage();
 */
const useGlobalMessage = () => {
  const [, dispatch] = useStore();

  const dispatchAction = (text, messageType, autoClose) => {
    dispatch({
      type: SET_MESSAGE,
      payload: {
        type: messageType,
        text: text,
        autoClose,
      },
    });
  };

  const success = (text, autoClose?) =>
    dispatchAction(text, MessageType.SUCCESS, autoClose);

  const info = (text, autoClose?) =>
    dispatchAction(text, MessageType.INFO, autoClose);

  const warning = (text, autoClose?) =>
    dispatchAction(text, MessageType.WARNING, autoClose);

  const error = (text, autoClose?) =>
    dispatchAction(text, MessageType.ERROR, autoClose);

  return { success, info, warning, error };
};

export default useGlobalMessage;
