/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// GraphQL Resolver Imports
import userResolver from './user';
import postResolver from './post';
import likeResolver from './like';
import followResolver from './follow';
import commentResolver from './comment';
import notificationResolver from './notification';
import message from './message';

export default [
  userResolver,
  postResolver,
  likeResolver,
  followResolver,
  commentResolver,
  notificationResolver,
  message,
];
