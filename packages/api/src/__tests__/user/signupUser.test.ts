/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Axios Imports
import axios from 'axios';

test('test signing up user', async () => {
  const query = `
    mutation signup($username: String!, $email: String!, $fullName: String!, $password: String!) {
        signup(input: { username: $username, email: $email, fullName: $fullName, password: $password }) {
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
          username: 'austinnsanders',
          email: 'austinnsanders@gmail.com',
          fullName: 'Austinn Sanders',
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
        ? expect(typeof response.data.data.signup.token).toBe('string')
        : expect(false).toBe(true),
    );
});
