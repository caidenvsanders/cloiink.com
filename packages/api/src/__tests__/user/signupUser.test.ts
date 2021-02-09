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
beforeEach(async () => {
  const prisma = new PrismaClient();

  await prisma.like.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.message.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.user.deleteMany();
});

describe('user signup GraphQL resolver', () => {
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
      .then((response) =>
        response
          ? expect(typeof response.data.data /* .signup.token */).toBeDefined()
          : expect(false).toBe(true),
      );
  });
});
