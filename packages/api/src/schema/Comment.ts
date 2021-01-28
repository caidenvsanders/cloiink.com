/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// GraphQL Tag Import
import { gql } from 'apollo-server-express';

/**
 * Comment schema
 */
const CommentSchema = gql`
  # ---------------------------------------------------------
  # Model Objects
  # ---------------------------------------------------------
  type Comment {
    id: ID!
    comment: String!
    author: ID
    post: ID
    createdAt: String
  }
  # ---------------------------------------------------------
  # Input Objects
  # ---------------------------------------------------------
  input CreateCommentInput {
    comment: String!
    author: ID!
    postId: ID!
  }
  input DeleteCommentInput {
    id: ID!
  }
  # ---------------------------------------------------------
  # Return Payloads
  # ---------------------------------------------------------
  type CommentPayload {
    id: ID
    comment: String
    author: UserPayload
    post: PostPayload
    createdAt: String
  }
  # ---------------------------------------------------------
  # Mutations
  # ---------------------------------------------------------
  extend type Mutation {
    # Creates a post comment
    createComment(input: CreateCommentInput!): Comment
    # Deletes a post comment
    deleteComment(input: DeleteCommentInput!): Comment
  }
`;

export default CommentSchema;
