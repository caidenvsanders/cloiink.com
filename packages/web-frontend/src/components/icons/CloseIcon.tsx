/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// CSS Frameworks & Animation Imports
import { withTheme } from 'styled-components';

// Type Declarations
interface Theme {
  colors: any;
}

interface ICloseIconProps {
  width?: string;
  color?: string;
  theme: Theme;
}

/**
 * Close (X) icon
 *
 * @param {string} width
 * @param {string} color
 */
export const CloseIcon = withTheme(
  ({ width, color, theme }: ICloseIconProps) => {
    const DEFAULT_WIDTH = '12';
    const DEFAULT_COLOR = theme.colors.text.secondary;

    return (
      <svg
        width={width || DEFAULT_WIDTH}
        fill={color ? theme.colors[color] : DEFAULT_COLOR}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 47.971 47.971"
      >
        <path d="M28.228 23.986L47.092 5.122a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0L23.986 19.744 5.121.88a2.998 2.998 0 0 0-4.242 0 2.998 2.998 0 0 0 0 4.242l18.865 18.864L.879 42.85a2.998 2.998 0 1 0 4.242 4.241l18.865-18.864L42.85 47.091c.586.586 1.354.879 2.121.879s1.535-.293 2.121-.879a2.998 2.998 0 0 0 0-4.242L28.228 23.986z" />
      </svg>
    );
  },
);

export default withTheme(CloseIcon);
