/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// CSS Frameworks & Animation Imports
import styled from 'styled-components';

// React Component Imports
import { Button } from './Form';
import { Spacing } from './Layout';

// Tyoe Declarations
interface IConfirmProps {
  title?: string;
  onCancel?: any;
  onOk?: any;
  cancelText?: string;
  okText?: string;
}

// CSS Components
const Root = styled.div`
  margin: auto;
  background-color: ${(p) => p.theme.colors.white};
  padding: ${(p) => p.theme.spacing.sm};
  border-radius: ${(p) => p.theme.radius.sm};
  z-index: ${(p) => p.theme.zIndex.sm};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

/**
 * Confirmation component menat to be rendered inside modal components
 */
const Confirm = ({
  title,
  onCancel,
  onOk,
  cancelText,
  okText,
}: IConfirmProps) => (
  <Root>
    <div>{title}</div>

    <Spacing top="md" />

    <ButtonContainer>
      <Button onClick={onCancel}>{cancelText}</Button>

      <Spacing left="xs">
        <Button color="red" onClick={onOk}>
          {okText}
        </Button>
      </Spacing>
    </ButtonContainer>
  </Root>
);

export default Confirm;
