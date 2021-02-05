/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// GraphQL Tag Import
import { gql } from 'apollo-server-express';

/**
 * Follow schema
 */
const FollowSchema = gql`
  # ---------------------------------------------------------
  # Model Objects
  # ---------------------------------------------------------
  type Follow {
    id: ID!
    userId: ID
    followerId: ID
  }
  # ---------------------------------------------------------
  # Input Objects
  # ---------------------------------------------------------
  input CreateFollowInput {
    userId: ID!
    followerId: ID!
  }
  input DeleteFollowInput {
    id: ID!
  }
  # ---------------------------------------------------------
  # Mutations
  # ---------------------------------------------------------
  extend type Mutation {
    # Creates a following/follower relationship between users
    createFollow(input: CreateFollowInput!): Follow
    # Deletes a following/follower relationship between users
    deleteFollow(input: DeleteFollowInput!): Follow
  }
`;

export default FollowSchema;
