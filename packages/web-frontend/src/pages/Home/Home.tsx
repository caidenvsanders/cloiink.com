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
  darkMode: boolean;
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

// Home React Component
const Home = (props: HomeProps) => {
  return (
    <Root>
      <PrimaryText>Cloink</PrimaryText>
      <SecondaryText>Communication Made Easy</SecondaryText>
      <ToggleSwitch toggled={props.darkMode} toggle={props.darkModeToggle} />
    </Root>
  );
};

// Default Export Home React Component
export default Home;
