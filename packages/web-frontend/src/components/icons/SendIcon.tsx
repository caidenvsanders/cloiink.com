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

interface ISendIconProps {
  width: string;
  color: string;
  theme: Theme;
}

/**
 * Close (X) icon
 *
 * @param {string} width
 * @param {string} color
 */
export const SendIcon = withTheme(({ width, color, theme }: ISendIconProps) => {
  const DEFAULT_WIDTH = '12';
  const DEFAULT_COLOR = theme.colors.primary.main;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || DEFAULT_WIDTH}
      fill={theme.colors[color] || DEFAULT_COLOR}
      viewBox="0 0 448.011 448.011"
    >
      <path d="M438.731 209.463l-416-192c-6.624-3.008-14.528-1.216-19.136 4.48a15.911 15.911 0 00-.384 19.648l136.8 182.4-136.8 182.4c-4.416 5.856-4.256 13.984.352 19.648 3.104 3.872 7.744 5.952 12.448 5.952 2.272 0 4.544-.48 6.688-1.472l416-192c5.696-2.624 9.312-8.288 9.312-14.528s-3.616-11.904-9.28-14.528z" />
    </svg>
  );
});

export default withTheme(SendIcon);
