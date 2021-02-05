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
   * Creates a new post
   *
   * @param {string} title
   * @param {string} image
   * @param {string} authorId
   */
  createPost: async (parent: any, args: any, ctx: Context) => {
    const newPost = await ctx.prisma.post.create({
      data: {
        title: args.input.title,
        image: args.input.image,
        imagePublicId: '',
        userId: args.input.authorId,
      },
    });

    await ctx.prisma.user.update({
      where: {
        id: args.input.authorId,
      },
      data: {
        posts: {
          connect: {
            id: newPost.id,
          },
        },
      },
    });

    return newPost;
  },
};

export default { Mutation };
