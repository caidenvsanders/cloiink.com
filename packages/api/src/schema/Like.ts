/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// GraphQL Tag Import
import { gql } from 'apollo-server-express';

/**
 * Like schema
 */
const LikeSchema = gql`
  # ---------------------------------------------------------
  # Model Objects
  # ---------------------------------------------------------
  type Like {
    id: ID!
    postId: ID
    userId: ID
  }
  # ---------------------------------------------------------
  # Input Objects
  # ---------------------------------------------------------
  input CreateLikeInput {
    userId: ID!
    postId: ID!
  }
  input DeleteLikeInput {
    id: ID!
  }
  # ---------------------------------------------------------
  # Return Payloads
  # ---------------------------------------------------------
  type LikePayload {
    id: ID!
    postId: PostPayload
    userId: UserPayload
  }
  # ---------------------------------------------------------
  # Mutations
  # ---------------------------------------------------------
  extend type Mutation {
    # Creates a like for post
    createLike(input: CreateLikeInput!): Like
    # Deletes a post like
    deleteLike(input: DeleteLikeInput!): Like
  }
`;

export default LikeSchema;
