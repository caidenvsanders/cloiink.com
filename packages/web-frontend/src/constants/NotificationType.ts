/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Available notification types
 */

export const NotificationType = {
  LIKE: 'LIKE',
  FOLLOW: 'FOLLOW',
  COMMENT: 'COMMENT',
};

const allNotificationTypes = Object.keys(NotificationType);
export default allNotificationTypes;
