/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// CSS Frameworks & Animation Imports
import styled from 'styled-components';

// Type Declarations
interface IContainerProps {
  marginTop: any;
  maxWidth: any;
  padding: any;
  radius: any;
  zIndex: any;
  bordered: any;
  color: any;
}

interface IContentProps {
  zIndex: any;
}

interface ISpacingProps {
  top?: any;
  right?: any;
  bottom?: any;
  left?: any;
  inline?: any;
  hideOnSm?: any;
}

interface IOverlayProps {
  transparency: string;
}

/**
 * Container div for holding UI using theme screen options
 *
 * @param {string} maxWidth
 * @param {string} padding
 * @param {boolean} bordered
 * @param {boolean} color
 */
export const Container = styled.div<IContainerProps>`
  position: relative;
  margin: 0 auto;
  margin-top: ${(p) => (p.marginTop ? p.theme.spacing[p.marginTop] : 0)};
  width: 100%;
  max-width: ${(p) => p.maxWidth && p.theme.screen[p.maxWidth]};
  padding: ${(p) =>
    p.padding ? `0 ${p.theme.spacing[p.padding]}` : `0 ${p.theme.spacing.sm}`};
  z-index: ${(p) => p.zIndex && p.theme.zIndex[p.zIndex]};
  background-color: ${(p) => p.color && p.theme.colors[p.color]};
  border-radius: ${(p) => p.radius && p.theme.radius[p.radius]};
`;

export const Content = styled.div<IContentProps>`
  position: relative;
  margin: 0 auto;
  width: 100%;
  z-index: ${(p) => p.zIndex && p.theme.zIndex[p.zIndex]};
  min-height: 500px;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    width: $((p) => p.theme.screen.xs);
  }

  @media (min-width: ${(p) => p.theme.screen.lg}) {
    width: ${(p) => p.theme.screen.sm};
  }
`;

/**
 * Adds margins to UI using theme spacing options
 *
 * @param {string} top
 * @param {string} right
 * @param {string} bottom
 * @param {string} left
 * @param {boolean} inline converts block element to inline block
 */
export const Spacing = styled.div<ISpacingProps>`
  ${(p) => p.top && `margin-top: ${p.theme.spacing[p.top]}`};
  ${(p) => p.right && `margin-right: ${p.theme.spacing[p.right]}`};
  ${(p) => p.bottom && `margin-bottom: ${p.theme.spacing[p.bottom]}`};
  ${(p) => p.left && `margin-left: ${p.theme.spacing[p.left]}`};
  ${(p) => p.inline && `display: inline-block;`}
  @media (max-width: ${(p) => p.theme.screen.sm}) {
    ${(p) =>
      p.hideOnSm &&
      `
    display: none;
  `}
  }
`;

/**
 * Overlay on top of the whole UI
 */
export const Overlay = styled.div<IOverlayProps>`
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: ${(p) => p.theme.zIndex.md};
  background-color: rgba(
    0,
    0,
    0,
    ${(p) => (p.transparency ? p.transparency : '0.8')}
  );
`;
