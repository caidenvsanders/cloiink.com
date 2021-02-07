/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// React Imports
import { useState, useEffect, useCallback } from 'react';

// Type Declarations
interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

/**
 * useWindowSize Hook
 *
 * usage:
 *      const { width, height } = useWindowSize();
 */
const useWindowSize = (): WindowSize => {
  const isClient = typeof window === 'object';

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }, [isClient]);

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect((): any => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSize, isClient]);

  return windowSize;
};

export default useWindowSize;
