import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { Overlay } from 'components/Layout';
import { AuthHeader, SignUp, ForgotPassword, ResetPassword } from 'pages/Auth';

import * as Routes from 'routes';

const Root = styled.div`
  background-color: #ff9d00;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://images.pexels.com/photos/1903702/pexels-photo-1903702.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1682&w=2500');
  background-attachment: fixed;
  background-size: cover;
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: ${(p) => p.theme.zIndex.lg};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    justify-content: center;
  }
`;

const Pages = styled.div`
  margin-top: 80px;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    margin-top: -120px;
  }
`;

/**
 * Main Layout for the app, when user isn't authenticated
 */
const AuthLayout = ({ refetch }) => {
  return (
    <Root>
      <Overlay transparency="0.05" />

      <Container>
        <AuthHeader refetch={refetch} />

        <Pages>
          <Switch>
            <Route
              exact
              path={Routes.HOME}
              render={() => <SignUp refetch={refetch} />}
            />
            <Route
              exact
              path={Routes.FORGOT_PASSWORD}
              component={ForgotPassword}
            />
            <Route
              exact
              path={Routes.RESET_PASSWORD}
              render={() => <ResetPassword refetch={refetch} />}
            />
            <Redirect to={Routes.HOME} />
          </Switch>
        </Pages>
      </Container>
    </Root>
  );
};

AuthLayout.propTypes = {
  refetch: PropTypes.func.isRequired,
};

export default AuthLayout;
