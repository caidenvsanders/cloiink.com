/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Prisma Imports
import { Follow, Prisma } from '@prisma/client';
import type { Context } from '../utils/context';

const Mutation = {
  /**
   * Creates a following/follower relationship between users
   *
   * @param {string} userId
   * @param {string} followerId
   */
  createFollow: async (parent: any, args: any, ctx: Context) => {
    const follow = await ctx.prisma.follow.create({
      data: {
        user: {
          connect: {
            id: args.input.userId,
          },
        },
        follower: {
          connect: {
            id: args.input.followerId,
          },
        },
      },
    });

    return follow;
  },

  /**
   * Deletes a following/follower relationship between users
   *
   * @param {string} id follow id
   */
  deleteFollow: async (parent: any, args: any, ctx: Context) => {
    const follow = await ctx.prisma.follow.findUnique({
      where: { id: args.input.id },
    });

    if (follow === null) return;

    await ctx.prisma.follow.delete({
      where: { id: args.input.id },
    });

    return follow;
  },
};

export default { Mutation };
