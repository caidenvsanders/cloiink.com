/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// CSS Frameworks & Animation Imports
import { createGlobalStyle } from 'styled-components';

// CSS Component Imports
import ResetStyle from 'css/Reset';
import GlobalStyle from 'css/GlobalStyle';

export default createGlobalStyle`
    ${ResetStyle}
    ${GlobalStyle}
`;
