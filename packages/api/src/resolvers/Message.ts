/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Prisma Imports
import { Follow, Prisma } from '@prisma/client';
import type { Context } from '../utils/context';

// Subscription Imports
import { pubSub } from '../utils/apollo-server';
import { MESSAGE_CREATED, NEW_CONVERSATION } from '../constants/Subscriptions';

const Query = {
  /**
   * Gets user's specific conversation
   *
   * @param {string} authUserId
   * @param {string} userId
   */
  getMessages: async (parent: any, args: any, ctx: Context) => {
    const specificMessage = ctx.prisma.message.findMany({
      where: {
        AND: [
          {
            OR: [{ senderId: args.authUserId }, { receiver: args.authUserId }],
          },
          {
            OR: [{ senderId: args.userId }, { receiver: args.userId }],
          },
        ],
      },
      select: {
        id: true,
        message: true,
        seen: true,
        sender: true,
        receiver: true,
        createdAt: true,
      },
    });

    return specificMessage;
  },
};

const Mutation = {};

const Subscription = {};

export default { Mutation };
