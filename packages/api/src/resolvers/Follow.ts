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

    // Push follower/following to user collection
    await ctx.prisma.user.update({
      where: {
        id: args.input.userId,
      },
      data: {
        followers: {
          connect: {
            id: follow.id,
          },
        },
      },
    });

    await ctx.prisma.user.update({
      where: {
        id: args.input.followerId,
      },
      data: {
        following: {
          connect: {
            id: follow.id,
          },
        },
      },
    });

    console.log(follow);
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

    // Delete follow from users collection
    await ctx.prisma.user.update({
      where: { id: follow.userId },
      data: {
        followers: {
          disconnect: {
            id: follow.id,
          },
        },
      },
    });

    await ctx.prisma.user.update({
      where: { id: follow.followerId },
      data: {
        following: {
          disconnect: {
            id: follow.id,
          },
        },
      },
    });

    return follow;
  },
};

export default { Mutation };
