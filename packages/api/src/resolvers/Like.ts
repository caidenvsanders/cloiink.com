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
   * Creates a like for post
   *
   * @param {string} userId
   * @param {string} postId
   */
  createLike: async (parent: any, args: any, ctx: Context) => {
    const like = await ctx.prisma.like.create({
      data: {
        user: {
          connect: {
            id: args.input.userId,
          },
        },
        post: {
          connect: {
            id: args.input.postId,
          },
        },
      },
    });

    return like;
  },

  /**
   * Deletes a post like
   *
   * @param {string} id
   */
  deleteLike: async (parent: any, args: any, ctx: Context) => {
    const like = await ctx.prisma.like.findUnique({
      where: { id: args.input.id },
    });

    if (like === null) return;

    await ctx.prisma.like.delete({
      where: { id: args.input.id },
    });

    return like;
  },
};

export default { Mutation };
