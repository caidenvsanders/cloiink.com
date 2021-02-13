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
  width: any;
  height: any;
  inline: any;
  top: any;
  left: any;
  right: any;
  bottom: any;
  radius: any;
}

interface ISkeletonProps extends IContainerProps {
  count: number;
}

// CSS Components
const Container = styled.div<IContainerProps>`
  width: ${(p) => p.width && `${p.width}px`};
  height: ${(p) => p.height && `${p.height}px`};
  display: ${(p) => p.inline && `inline-block`};
  margin-top: ${(p) => p.theme.spacing[p.top]};
  margin-left: ${(p) => p.theme.spacing[p.left]};
  margin-right: ${(p) => p.theme.spacing[p.right]};
  margin-bottom: ${(p) => p.theme.spacing[p.bottom]};
  background-color: ${(p) => p.theme.colors.grey[200]};
  border-radius: ${(p) =>
    p.radius ? p.theme.radius[p.radius] : p.theme.radius.sm};
`;

/**
 * Renders a UI block to inform a user that content will be shown here after loading
 */
const Skeleton = ({
  count,
  width,
  height,
  inline,
  top,
  right,
  bottom,
  left,
  radius,
}: ISkeletonProps) => {
  const loopSkeleton = () => {
    let skeleton = [];
    for (let i = 0; i < count; i++) {
      skeleton.push(
        <Container
          key={i}
          top={top}
          left={left}
          right={right}
          bottom={bottom}
          width={width}
          height={height}
          inline={inline}
          radius={radius}
        ></Container>,
      );
    }

    return skeleton;
  };

  return loopSkeleton();
};

export default Skeleton;
