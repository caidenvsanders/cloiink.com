/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Prisma Imports
import { Prisma } from '@prisma/client';
import { UserInputError } from 'apollo-server';
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
    const users = await ctx.prisma.user.findMany({
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
            comments: true,
          },
        },
        comments: {
          include: {
            author: true,
          },
        },
      },
      skip: args.skip,
      take: args.limit,
    });
    const count = users.length;

    return { users, count };
  },
};

const Mutation = {
  /**
   * Signs up user
   *
   * @param {string} fullName
   * @param {string} email
   * @param {string} username
   * @param {string} password
   */
  signup: async (parent: any, args: any, ctx: Context) => {
    let user = await ctx.prisma.user.findUnique({
      where: { username: args.input.username },
    });

    if (user) {
      throw new Error('Username is already taken.');
    } else {
      user = await ctx.prisma.user.findUnique({
        where: { email: args.input.email },
      });

      if (user) {
        throw new Error('An account is already using that email.');
      }
    }

    const newUser = await ctx.prisma.user.create({
      data: {
        fullName: args.input.fullName,
        email: args.input.email,
        username: args.input.username,
        passwordResetToken: '',
        passwordResetTokenExpiry: '',
        password: args.input.password,
        image: '',
        imagePublicId: '',
        coverImage: '',
        coverImagePublicId: '',
      },
    });
  },
};

export default { Query, Mutation };
