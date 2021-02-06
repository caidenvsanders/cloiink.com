/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Prisma Imports
import type { Context } from '../utils/context';

// Bcrypt Imports
import bcrypt from 'bcryptjs';

// Utility Imports
import { generateToken } from '../utils/generate-token';

// Constant Declarations
const AUTH_TOKEN_EXPIRY = '1y';

const Query = {
  /**
   * Gets the currently logged in user
   */
  getAuthUser: async (parent: any, args: any, ctx: Context) => {
    if (!ctx.authUser) return null;

    return ctx.authUser;
  },

  /**
   * Gets user by username
   *
   * @param {string} username
   */
  getUser: async (parent: any, args: any, ctx: Context) => {
    const user = ctx.prisma.user.findUnique({
      where: { username: args.username },
    });

    if (!user) throw new Error(`Couldn't find user.`);

    return user;
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
        passwordResetToken: true,
        passwordResetTokenExpiry: true,
        password: true,
        image: true,
        imagePublicId: true,
        coverImage: true,
        coverImagePublicId: true,
        isOnline: true,
        comments: true,
        following: true,
        followers: true,
        likes: true,
        messages: true,
        notifications: true,
        posts: { include: { author: true, comments: true } },
        createdAt: true,
      },
      skip: args.skip,
      take: args.limit,
    });
    const count = users.length;

    return { users, count };
  },

  /**
   * Gets user posts by username
   *
   * @param {string} username
   * @param {int} skip how many posts to skip
   * @param {int} limit how many posts to limit
   */
  getUserPosts: async (parent: any, args: any, ctx: Context) => {
    const user = await ctx.prisma.user.findUnique({
      where: { username: args.username },
      include: {
        posts: {
          skip: args.skip,
          take: args.limit,
          include: {
            author: true,
            comments: true,
            likes: true,
            Notification: true,
          },
        },
      },
    });
    const posts = user?.posts;
    const count = posts?.length;

    return { posts, count };
  },

  /**
   * Gets Suggested people for user
   *
   * @param {string} userId
   */
  suggestPeople: async (parent: any, args: any, ctx: Context) => {
    const LIMIT = 6;

    // Find who user follows (including self)
    const userFollowing = [];
    const following = await ctx.prisma.follow.findMany({
      where: { follower: args.userId },
    });

    following.map((f) => userFollowing.push(f.userId));
    userFollowing.push(args.userId);

    // Find random users
    const usersCount = (await ctx.prisma.user.count()) - userFollowing.length;
    let random = Math.floor(Math.random() * usersCount);

    const usersLeft = usersCount - random;
    if (usersLeft < LIMIT) {
      random = random - (LIMIT - usersLeft);
      if (random < 0) {
        random = 0;
      }
    }

    const randomUsers = await ctx.prisma.user.findMany({
      skip: random,
      take: LIMIT,
    });

    return randomUsers;
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
