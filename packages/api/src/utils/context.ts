/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Prisma Imports
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Context {
  authUser?: any;
  prisma: PrismaClient;
}

export const createContext = (): Context => {
  return { prisma };
};
