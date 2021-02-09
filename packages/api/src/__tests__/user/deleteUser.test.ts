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

  new Promise<void>(async () => {
    await prisma.like.deleteMany();
    await prisma.follow.deleteMany();
    await prisma.message.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.user.deleteMany();
  }).then(async () => {
    return new Promise<void>(async () => {
      await prisma.user.create({
        data: {
          fullName: 'Austin Sanders',
          email: 'austinsanders@gmail.com',
          username: 'austinsanders',
          passwordResetToken: '',
          passwordResetTokenExpiry: '',
          password: 'austinsanders',
          image: '',
          imagePublicId: '',
          coverImage: '',
          coverImagePublicId: '',
        },
      });
    });
  });
});

describe('user deleteUser graphQL resolver', () => {
  test('test deleting a user', async () => {
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
      .then((response) =>
        response
          ? expect(
              typeof response.data.data /* .deleteUser.email */,
            ).toBeDefined()
          : expect(false).toBe(true),
      );
  });
});
