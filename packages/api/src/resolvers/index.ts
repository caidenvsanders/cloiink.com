/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// GraphQL Resolver Imports
import userResolver from './User';
import postResolver from './Post';
import likeResolver from './Like';
import followResolver from './Follow';
import commentResolver from './Comment';
import notificationResolver from './Notification';
import messageResolver from './Message';

export default [
  userResolver,
  postResolver,
  likeResolver,
  followResolver,
  commentResolver,
  notificationResolver,
  messageResolver,
];
