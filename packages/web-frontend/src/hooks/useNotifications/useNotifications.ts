/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Apollo Imports
import { useApolloClient } from '@apollo/client';

// GraphQL Schema Imports
import { CREATE_NOTIFICATION, DELETE_NOTIFICATION } from 'graphql/notification';

// Context Store Inputs
import { useStore } from 'store';

/**
 * useNotifications Hook
 *
 * React hook that xreates or deletes a notification after a like, follow or comment
 *
 * usage:
 *      const { create, remove, toggle } = useNotifications();
 */
export const useNotifications = () => {
  const [{ auth }] = useStore();

  const client = useApolloClient();

  /**
   * Helper function for mutation
   */
  const mutate = async (
    mutation: any,
    variables:
      | {
          authorId: any;
          userId: any;
          postId: any;
          notificationType: any;
          notificationTypeId: any;
        }
      | { id: any },
  ) => {
    try {
      return await client.mutate({
        mutation,
        variables: { input: { ...variables } },
      });
    } catch (error) {
      console.error('Error while mutating a notification', error);
    }
  };

  /**
   * Creates a notification
   */
  const create = ({
    user,
    postId,
    notificationType,
    notificationTypeId,
  }: {
    user: any;
    postId: any;
    notificationType: any;
    notificationTypeId: any;
  }) => {
    return mutate(CREATE_NOTIFICATION, {
      authorId: auth.user.id,
      userId: user.id,
      postId,
      notificationType,
      notificationTypeId,
    });
  };

  /**
   * Removes a notification
   */
  const remove = ({ notificationId }: { notificationId: any }) =>
    mutate(DELETE_NOTIFICATION, { id: notificationId });

  /**
   * Checks if user has already a notification and based on that Creates or Deletes a notification
   */
  const toggle = ({
    user,
    postId,
    notificationType,
    notificationTypeId,
    hasDone,
  }: {
    user: any;
    postId: any;
    notificationType: any;
    notificationTypeId: any;
    hasDone: any;
  }) => {
    const type = notificationType.toLowerCase();
    const isNotified = user.notifications.find(
      (n: { [x: string]: { id: any } }) =>
        n[type] && hasDone && n[type].id === hasDone.id,
    );
    const notificationId = isNotified ? isNotified.id : null;
    const operation = notificationId ? 'delete' : 'create';
    const options = {
      create: {
        mutation: CREATE_NOTIFICATION,
        variables: {
          authorId: auth.user.id,
          userId: user.id,
          postId,
          notificationType,
          notificationTypeId,
        },
      },
      delete: {
        mutation: DELETE_NOTIFICATION,
        variables: { id: notificationId },
      },
    };

    return mutate(options[operation].mutation, options[operation].variables);
  };

  return { create, remove, toggle };
};
