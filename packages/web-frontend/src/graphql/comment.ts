/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { gql } from '@apollo/client';

/**
 * Creates a comment
 */
export const CREATE_COMMENT = gql`
  mutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
    }
  }
`;

/**
 * Deletes a comment
 */
export const DELETE_COMMENT = gql`
  mutation($input: DeleteCommentInput!) {
    deleteComment(input: $input) {
      id
    }
  }
`;
