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
   * Gets all posts
   *
   * @param {string} authUserId
   * @param {int} skip how many posts to skip
   * @param {int} limit how many posts to limit
   */
  getPosts: async (parent: any, args: any, ctx: Context) => {
    const posts = await ctx.prisma.post.findMany({
      where: {
        NOT: {
          userId: args.authUserId,
        },
      },
      select: {
        id: true,
        title: true,
        image: true,
        imagePublicId: true,
        author: true,
        comments: true,
        likes: true,
        createdAt: true,
      },
      skip: args.skip,
      take: args.take,
    });
    const count = posts.length;

    return { posts, count };
  },

  /**
   * Gets posts from followed users
   *
   * @param {string} userId
   * @param {int} skip how many posts to skip
   * @param {int} limit how many posts to limit
   */
  getFollowedPosts: async (parent: any, args: any, ctx: Context) => {
    const userFollowing: any = [];
    const follow = await ctx.prisma.follow.findMany({
      where: { followerId: args.userId },
      select: { userId: true },
    });
    follow.map((f) => userFollowing.push(f.userId));

    const followedPosts = await ctx.prisma.post.findMany({
      where: {
        OR: [
          {
            userId: { in: userFollowing },
          },
          {
            userId: args.userId,
          },
        ],
      },
      select: {
        id: true,
        title: true,
        image: true,
        imagePublicId: true,
        author: true,
        comments: true,
        likes: true,
        createdAt: true,
      },
      skip: args.skip,
      take: args.limit,
    });
    const followedPostsCount = followedPosts.length;

    return { posts: followedPosts, count: followedPostsCount };
  },

  /**
   * Gets post by id
   *
   * @param {string} id
   */
  getPost: async (parent: any, args: any, ctx: Context) => {
    const post = await ctx.prisma.post.findUnique({
      where: {
        id: args.id,
      },
      select: {
        id: true,
        title: true,
        image: true,
        imagePublicId: true,
        author: true,
        comments: true,
        likes: true,
        createdAt: true,
      },
    });

    return post;
  },
};

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
        author: {
          connect: {
            id: args.input.authorId,
          },
        },
      },
    });

    return newPost;
  },
};

export default { Query, Mutation };
