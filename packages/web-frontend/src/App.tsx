/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// CSS Frameworks & Animation Imports
import styled, { ThemeProvider } from 'styled-components';

import lightTheme from './css/LightTheme';
import darkTheme from './css/DarkTheme';

// React Hook Imports
import useDarkMode from './hooks/useDarkMode';

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

const PrimaryText = styled.p`
  font-size: ${(props) => props.theme.font.size.xl};
  color: ${(props) => props.theme.colors.text.primary};
`;

const Button = styled.button`
  height: 50px;
  width: 200px;
  border: 0;
  outline: 0;
  box-shadow: ${(props) => props.theme.shadows.sm};
`;

const App = () => {
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <Root>
        <PrimaryText>Test1</PrimaryText>
        <Button onClick={themeToggler}>Switch Theme</Button>
      </Root>
    </ThemeProvider>
  );
};

export default App;
