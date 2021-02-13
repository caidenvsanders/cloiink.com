/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// CSS Frameworks & Animation Imports
import styled from 'styled-components';

// React Component Imports
import { EmptyIcon } from 'components/icons';

// Type Declarations
interface IEmptyProps {
  text: string;
}

// CSS Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/**
 * Component for displaying when there is no data provided
 */
const Empty = ({ text }: IEmptyProps) => (
  <Container>
    <EmptyIcon />

    {text}
  </Container>
);

export default Empty;
