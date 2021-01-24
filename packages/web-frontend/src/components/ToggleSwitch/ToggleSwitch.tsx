/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// CSS Frameworks and Animation Imports
import styled from 'styled-components';

// Type Declarations
interface ToggleSwitchProps {
  toggle: () => {};
}

const Wrapper = styled.label`
  position: absolute;
  display: inline-block;
  top: 10px;
  right: 10px;
  width: 90px;
  height: 34px;

  user-select: none;
`;

const Checkbox = styled.input.attrs({
  type: 'checkbox',
})`
  display: none;
`;

const Slider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  transition: 0.4s;

  cursor: pointer;
  background-color: #ccc;
  border-radius: 0;

  ${Checkbox}:checked + & {
    background-color: #3b97d3;
  }

  ${Checkbox}:focus + & {
    box-shadow: 0 0 1px #3b97d3;
  }

  &:before {
    position: absolute;
    content: '';
    left: 4px;
    bottom: 4px;

    transition: 0.4s;

    height: 26px;
    width: 26px;
    background-color: white;
    border-radius: 0;

    ${Checkbox}:checked + & {
      transform: translateX(56px);
    }
  }
`;

// ToggleSwitch React Component
const ToggleSwitch = (props: ToggleSwitchProps) => {
  return (
    <>
      <Wrapper>
        <Checkbox onChange={props.toggle} />
        <Slider />
      </Wrapper>
    </>
  );
};

// Default Export ToggleSwitch React Component
export default ToggleSwitch;
