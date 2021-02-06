/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Axios Imports
import axios from 'axios';

test('test signing in user', async () => {
  const query = `
    mutation signin($emailOrUsername: String!, $password: String!) {
        signin(input: { emailOrUsername: $emailOrUsername, password: $password }) {
            token
        }
    }
  `;

  await axios
    .post(
      'http://localhost:4000/graphql',
      {
        query: query,
        variables: {
          emailOrUsername: 'austinnsanders@gmail.com',
          password: 'austinnsanders',
        },
      },
      { headers: { 'Content-Type': 'application/json' } },
    )
    .catch((error) => {
      if (error.response) console.log(error.response);
      if (error.request) console.log(error.request);
      if (error.message) console.log(error.message);
    })
    .then((response) =>
      response
        ? expect(typeof response.data.data.signin.token).toBe('string')
        : expect(false).toBe(true),
    );
});
