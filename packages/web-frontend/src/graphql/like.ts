/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { gql } from '@apollo/client';

/**
 * Creates a like
 */
export const CREATE_LIKE = gql`
  mutation($input: CreateLikeInput!) {
    createLike(input: $input) {
      id
    }
  }
`;

/**
 * Deletes a like
 */
export const DELETE_LIKE = gql`
  mutation($input: DeleteLikeInput!) {
    deleteLike(input: $input) {
      id
    }
  }
`;
