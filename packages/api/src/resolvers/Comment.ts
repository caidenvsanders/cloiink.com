/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Prisma Imports
import { Prisma } from '@prisma/client';
import type { Context } from '../utils/context';

const Mutation = {
  /**
   * Creates a post comment
   *
   * @param {string} comment
   * @param {string} author author id
   * @param {string} postId
   */
  createComment: async (parent: any, args: any, ctx: Context) => {
    const newComment = await ctx.prisma.user.update({
      where: {
        id: args.author.id,
      },
      data: {
        comments: {
          create: {
            comment: args.comment,
            post: {
              connect: {
                id: args.postId,
              },
            },
          },
        },
      },
    });

    await ctx.prisma.post.update({
      where: {
        id: args.postId,
      },
      data: {
        comments: {
          create: {
            comment: args.comment,
            author: {
              connect: {
                id: args.author.id,
              },
            },
          },
        },
      },
    });

    return newComment;
  },
  /**
   * Deletes a post comment
   *
   * @param {string} id
   */
  deleteComment: async (parent: any, args: any, ctx: Context) => {
    const comment = await ctx.prisma.user.delete({
      where: { id: args.postId },
    });

    return comment;
  },
};

export default { Mutation };
