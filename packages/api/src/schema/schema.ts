/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// GraphQL Tag Import
import { gql } from 'apollo-server-express';

// GraphQL Schema Imports
import UserSchema from './User';
import PostSchema from './Post';
import MessageSchema from './Message';
import LikeSchema from './Like';
import FollowSchema from './Follow';
import CommentSchema from './Comment';
import NotificationSchema from './Notification';

const schema = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
  ${UserSchema}
  ${PostSchema}
  ${MessageSchema}
  ${FollowSchema}
  ${LikeSchema}
  ${CommentSchema}
  ${NotificationSchema}
`;

export default schema;
