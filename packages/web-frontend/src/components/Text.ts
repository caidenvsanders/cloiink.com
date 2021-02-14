/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// React Imports
import { Link } from 'react-router-dom';

// CSS Frameworks & Animation Imports
import styled, { css } from 'styled-components';

// Type Declarations
interface ITextProps {
  color?: any;
  weight?: any;
  size?: any;
  theme: any;
}

/**
 * Wrapper around React Router's Link components that uses theme styling
 *
 * @param {string} color
 * @param {string} weight
 * @param {string} size
 */
export const A = styled(Link)<ITextProps>`
  text-decoration: none;
  transition: color 0.1s;
  display: inline-block;
  color: ${(p) =>
    p.color ? p.theme.colors[p.color] : p.theme.colors.text.secondary};
  font-weight: ${(p) =>
    p.weight ? p.theme.font.weight[p.weight] : p.theme.font.weight.normal};
  font-size: ${(p) =>
    p.size ? p.theme.font.size[p.size] : p.theme.font.size.xs};

  &:hover {
    color: ${(p) => p.theme.colors.text.primary};
  }
`;

/**
 * Component for wrapping error messages
 */
export const Error = styled.div<ITextProps>`
  color: ${(p) =>
    p.color ? p.theme.colors[p.color] : p.theme.colors.error.main};
  font-size: ${(p) =>
    p.size ? p.theme.font.size[p.size] : p.theme.font.size.sm};
`;

/**
 * Helper function for adding styles to heading components
 *
 * @param {string} size size of text
 */
const getHeadingStyles = (size: any) => css<ITextProps>`
  margin: 0;
  font-size: ${size};
  font-weight: ${(p) => p.theme.font.weight.normal};
  color: ${(p) =>
    p.color ? p.theme.colors[p.color] : p.theme.colors.text.primary};
`;

export const H1 = styled.h1`
  ${getHeadingStyles((p: ITextProps) => p.theme.font.size.xl)}
`;

export const H2 = styled.h2`
  ${getHeadingStyles((p: ITextProps) => p.theme.font.size.lg)}
`;

export const H3 = styled.h3`
  ${getHeadingStyles((p: ITextProps) => p.theme.font.size.xs)}
`;
