/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// React Imports
import { useRef, useMemo } from 'react';

/**
 * Compares inputs and console logs changes
 *
 * @param {array} inputKeys
 * @param {array} oldInputs
 * @param {array} newInputs
 */
const compareInputs = (
  inputKeys: any[],
  oldInputs: any[],
  newInputs: any[],
) => {
  inputKeys.forEach((key) => {
    const oldInput = oldInputs[key];
    const newInput = newInputs[key];

    if (oldInput !== newInput) {
      console.log('change detected', key, 'old:', oldInput, 'new:', newInput);
    }
  });
};

/**
 * useDependencyDebugger Hook
 *
 * usage:
 *      useDependencyDebugger(inputs);
 */
const useDependencyDebugger = (inputs: any) => {
  const oldInputsRef = useRef(inputs);
  const inputValuesArray = Object.values(inputs);
  const inputKeysArray = Object.keys(inputs);

  useMemo(() => {
    const oldInputs = oldInputsRef.current;

    compareInputs(inputKeysArray, oldInputs, inputs);

    oldInputsRef.current = inputs;
  }, inputValuesArray); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useDependencyDebugger;
