/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// CSS Frameworks & Animation Imports
import styled from 'styled-components';

// React Component Imports
import ToggleSwitch from 'components/ToggleSwitch';

// Type Declarations
interface HomeProps {
  darkModeToggle: () => {};
}

// Root CSS Component
const Root = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.body};
  transition: all 0.3s ease-in-out;
`;

// PrimaryText CSS Component
const PrimaryText = styled.p`
  font-size: ${(props) => props.theme.font.size.xxl};
  color: ${(props) => props.theme.colors.text.primary};
  padding: ${(props) => props.theme.spacing.lg};
`;

// SecondaryText CSS Component
const SecondaryText = styled.p`
  color: ${(props) => props.theme.colors.primary.main};
  font-size: ${(props) => props.theme.font.size.xl};
`;

// Button CSS Component
const Button = styled.button`
  height: 50px;
  width: 200px;
  background: ${(props) => props.theme.colors.text.primary};
  color: ${(props) => props.theme.colors.text.opposite};
  border: 0;
  outline: 0;
  box-shadow: ${(props) => props.theme.shadows.sm};
`;

// Home React Component
const Home = (props: HomeProps) => {
  return (
    <Root>
      <PrimaryText>Cloink</PrimaryText>
      <SecondaryText>Communication Made Easy</SecondaryText>
      <ToggleSwitch toggle={props.darkModeToggle} />
      <Button onClick={props.darkModeToggle} style={{ display: 'none' }}>
        Switch Theme
      </Button>
    </Root>
  );
};

// Default Export Home React Component
export default Home;
