import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { Overlay } from 'components/Layout';
import { AuthHeader, SignUp, ForgotPassword, ResetPassword } from 'pages/Auth';

import * as Routes from 'routes';

const Root = styled.div`
  background-color: #ff9d00;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%23ff9d00' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23fb8d17' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23f47d24' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23ed6e2d' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23e35f34' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23d85239' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23cc453e' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23be3941' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23b02f43' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23a02644' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23901e44' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23801843' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%236f1341' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%235e0f3d' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%234e0c38' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%233e0933' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%232e062c' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23210024' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
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
