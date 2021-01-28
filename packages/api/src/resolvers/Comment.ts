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
    console.log(args);

    const newComment = ctx.prisma.comment.create({
      data: {
        comment: args.input.comment,
        userId: args.input.author,
        postId: args.input.postId,
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
