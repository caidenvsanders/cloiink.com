/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ---------------------------------------------
// Default Route (/)
// ---------------------------------------------
const DEFAULT: string = '/';
export { DEFAULT };

// ---------------------------------------------
// Home Route (/home)
// ---------------------------------------------
const HOME: string = '/home';
export { HOME };

// ---------------------------------------------
// Forgot Password Route (/forgot-password)
// ---------------------------------------------
const FORGOTPASSWORD: string = '/forgot-password';
export { FORGOTPASSWORD };

// ---------------------------------------------
// Reset Password Route (/reset-password)
// ---------------------------------------------
const RESETPASSWORD: string = '/reset-password';
export { RESETPASSWORD };

// ---------------------------------------------
// Explore Route (/explore)
// ---------------------------------------------

const EXPLORE: string = '/explore';
export { EXPLORE };

// ---------------------------------------------
// People Route (/people)
// ---------------------------------------------

const PEOPLE: string = '/people';
export { PEOPLE };

// ---------------------------------------------
// Notifications Route (/notifications)
// ---------------------------------------------

const NOTIFICATIONS: string = '/notifications';
export { NOTIFICATIONS };

// ---------------------------------------------
// Messages Route (/messages/:userId)
// ---------------------------------------------

const MESSAGES: string = '/messages/:userId';
export { MESSAGES };

// ---------------------------------------------
// Posts Route (/post/:id)
// ---------------------------------------------

const POSTS: string = '/post/:id';
export { POSTS };

// ---------------------------------------------
// User Profile Route (/user/:username)
// ---------------------------------------------

const USERPROFILE: string = '/user/:username';
export { USERPROFILE };

// ---------------------------------------------
// Blank ID Value Export
// ---------------------------------------------
export const NEW_ID_VALUE: string = 'new';

// ---------------------------------------------
// Default Export of All Routes
// ---------------------------------------------

const ROUTES = {
  DEFAULT,
  HOME,
  FORGOTPASSWORD,
  RESETPASSWORD,
  EXPLORE,
  PEOPLE,
  NOTIFICATIONS,
  MESSAGES,
  POSTS,
  USERPROFILE,
  NEW_ID_VALUE,
};
export default ROUTES;
