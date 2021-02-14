/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// CSS Frameworks & Animation Imports
import styled from 'styled-components';

// React Component Imports
import { UserIcon } from './icons';

// Type Declarations
interface IRootProps {
  size?: string;
}

interface IAvatarProps {
  size?: string;
  image?: string;
}

// CSS Components
const Root = styled.div<IRootProps>`
  width: ${(p) => (p.size ? `${p.size}` : `1.875rem`)};
  height: ${(p) => (p.size ? `${p.size}` : '1.875rem')};
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/**
 * Component for rendering user's image
 */
const Avatar = ({ size, image }: IAvatarProps) => (
  <Root size={size}>
    {image ? (
      <Image src={image} />
    ) : (
      <UserIcon width={size ? `${size}` : `1.875rem`} />
    )}
  </Root>
);

export default Avatar;
