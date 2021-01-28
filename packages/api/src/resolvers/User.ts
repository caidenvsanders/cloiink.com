/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Prisma Imports
import { Prisma } from '@prisma/client';
import type { Context } from '../utils/context';

const Query = {
  /**
   * Gets user by username
   *
   * @param {string} username
   */
  getUser: async (parent: any, args: any, ctx: Context) => {
    return ctx.prisma.user.findUnique({ where: { username: args.username } });
  },

  /**
   * Gets multiple users
   *
   * @param {string} userId
   * @param {int} skip how many users to skip
   * @param {int} limit how many users to limit
   */
  getUsers: async (parent: any, args: any, ctx: Context) => {
    const users = ctx.prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        username: true,
        password: true,
        image: true,
        imagePublicId: true,
        coverImage: true,
        coverImagePublicId: true,
        isOnline: true,
        posts: {
          include: {
            author: true,
          },
        },
        comments: {
          include: {
            author: true,
          },
        },
      },
    });
    const count = ctx.prisma.user.count();

    return { users, count };
  },
};

export default { Query };
