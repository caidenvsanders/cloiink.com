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

// Bcrypt Imports
import bcrypt from 'bcryptjs';

// Utility Imports
import { generateToken } from '../utils/generate-token';

// Constant Declarations
const AUTH_TOKEN_EXPIRY = '1y';

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
   * Signs in user
   *
   * @param {string} emailOrUsername
   * @param {string} password
   */
  signin: async (parent: any, args: any, ctx: Context) => {
    const user =
      (await ctx.prisma.user.findUnique({
        where: { username: args.input.emailOrUsername },
      })) ||
      (await ctx.prisma.user.findUnique({
        where: { email: args.input.emailOrUsername },
      }));

    if (!user) {
      throw new Error('Username or email not found.');
    }

    const isValidPassword = await bcrypt.compare(
      args.input.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new Error('Invalid password.');
    }

    return {
      token: generateToken(
        user,
        process.env.SECRET as string,
        AUTH_TOKEN_EXPIRY,
      ),
    };
  },

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

    const password: string = await new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw new Error(err.message);

        bcrypt.hash(args.input.password, salt, (err, hash) => {
          if (err) throw new Error(err.message);

          resolve(hash);
        });
      });
    });

    const newUser = await ctx.prisma.user.create({
      data: {
        fullName: args.input.fullName,
        email: args.input.email,
        username: args.input.username,
        passwordResetToken: '',
        passwordResetTokenExpiry: '',
        password: password,
        image: '',
        imagePublicId: '',
        coverImage: '',
        coverImagePublicId: '',
      },
    });

    return {
      token: generateToken(
        newUser,
        process.env.SECRET as string,
        AUTH_TOKEN_EXPIRY,
      ),
    };
  },
};

export default { Query, Mutation };
