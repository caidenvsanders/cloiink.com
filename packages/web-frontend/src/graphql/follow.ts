/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { gql } from '@apollo/client';

/**
 * Creates a following between two users
 */
export const CREATE_FOLLOW = gql`
  mutation($input: CreateFollowInput!) {
    createFollow(input: $input) {
      id
    }
  }
`;

/**
 * Deletes a following
 */
export const DELETE_FOLLOW = gql`
  mutation($input: DeleteFollowInput!) {
    deleteFollow(input: $input) {
      id
    }
  }
`;
