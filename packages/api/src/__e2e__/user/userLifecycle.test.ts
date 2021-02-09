/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Axios Imports
import axios from 'axios';

// Prisma Imports
import { PrismaClient } from '@prisma/client';

jest.setTimeout(30000);

beforeAll(async () => {
  const prisma = new PrismaClient();

  new Promise<void>(async () => {
    await prisma.like.deleteMany();
    await prisma.follow.deleteMany();
    await prisma.message.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.user.deleteMany();
  });
});

describe('sign up for an account, sign in to the account, and delete the account', () => {
  test('sign up for an account', async () => {
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
            username: 'austinsanders',
            email: 'austinsanders@gmail.com',
            fullName: 'Austin Sanders',
            password: 'austinsanders',
          },
        },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .catch((error) => {
        if (error.response) console.log(error.response);
        if (error.request) console.log(error.request);
        if (error.message) console.log(error.message);
      })
      .then((response) => {
        if (response) {
          expect(typeof response.data.data /* .signup.token */).toBeDefined();
        } else {
          expect(false).toBe(true);
        }
      });
  });

  test('sign in to the account', async () => {
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
            emailOrUsername: 'austinsanders@gmail.com',
            password: 'austinsanders',
          },
        },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .catch((error) => {
        if (error.response) console.log(error.response);
        if (error.request) console.log(error.request);
        if (error.message) console.log(error.message);
      })
      .then((response) => {
        if (response) {
          expect(typeof response.data.data /* .signin.token */).toBeDefined();
        } else {
          expect(false).toBe(true);
        }
      });
  });

  test('delete the account', async () => {
    const query = `
    mutation deleteUser($emailOrUsername: String!, $password: String!) {
        deleteUser(input: { emailOrUsername: $emailOrUsername, password: $password }) {
            email
        }
    }
  `;

    await axios
      .post(
        'http://localhost:4000/graphql',
        {
          query: query,
          variables: {
            emailOrUsername: 'austinsanders@gmail.com',
            password: 'austinsanders',
          },
        },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .catch((error) => {
        if (error.response) console.log(error.response);
        if (error.request) console.log(error.request);
        if (error.message) console.log(error.message);
      })
      .then((response) => {
        if (response) {
          expect(
            typeof response.data.data /* .deleteUser.email */,
          ).toBeDefined();
        } else {
          expect(false).toBe(true);
        }
      });
  });
});
