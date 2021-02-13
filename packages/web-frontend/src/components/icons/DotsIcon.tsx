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

interface IDotsIconProps {
  width: string;
  color: string;
  theme: Theme;
}

/**
 * Dots icon
 *
 * @param {string} width
 * @param {string} color
 */
export const DotsIcon = withTheme(({ width, color, theme }: IDotsIconProps) => {
  const DEFAULT_WIDTH = '17';
  const DEFAULT_COLOR = theme.colors.text.primary;

  return (
    <svg
      width={width || DEFAULT_WIDTH}
      fill={theme.colors[color] || DEFAULT_COLOR}
      viewBox="0 0 612 612"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="69.545" cy="306" r="69.545" />
      <circle cx="306" cy="306" r="69.545" />
      <circle cx="542.455" cy="306" r="69.545" />
    </svg>
  );
});

export default withTheme(DotsIcon);
