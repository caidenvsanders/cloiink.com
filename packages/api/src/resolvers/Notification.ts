/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Prisma Imports
import { Follow, Prisma } from '@prisma/client';
import { Context } from '../utils/context';

// Subscription Imports
import { withFilter } from 'apollo-server';
import { pubSub } from '../utils/apollo-server';
import { NOTIFICATION_CREATED_OR_DELETED } from '../constants/Subscriptions';

const Query = {
  /**
   * Gets notifications for specific user
   *
   * @param {string} userId
   * @param {int} skip how many notifications to skip
   * @param {int} limit how many notifications to limit
   */
  getUserNotifications: async (parent: any, args: any, ctx: Context) => {
    const notifications = await ctx.prisma.notification.findMany({
      where: { userId: args.userId },
      skip: args.skip,
      take: args.take,
    });
    const count = notifications.length;

    return { notifications, count };
  },
};

const Mutation = {
  /**
   * Creates a new notification for user
   *
   * @param {string} userId
   * @param {string} authorId
   * @param {string} postId
   * @param {string} notificationType
   * @param {string} notificationTypeId
   */
  createNotification: async (parent: any, args: any, ctx: Context) => {
    const newNotification = await ctx.prisma.notification.create({
      data: {
        author: {
          connect: {
            id: args.input.authorId,
          },
        },
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
        [args.input.notificationType.toLowerCase()]: args.input
          .notificationTypeId,
      },
    });

    // Publish notification created event
    pubSub.publish(NOTIFICATION_CREATED_OR_DELETED, {
      notificationCreatedOrDeleted: {
        operation: 'CREATE',
        notification: newNotification,
      },
    });

    return newNotification;
  },
};

const Subscription = {};

export default { Query, Mutation, Subscription };
