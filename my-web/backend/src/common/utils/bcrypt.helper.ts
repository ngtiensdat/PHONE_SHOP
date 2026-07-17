/**
 * BcryptHelper
 * Utility for hashing and verifying passwords using bcrypt.
 * Salt rounds: 12 (production-safe).
 *
 * Related: src/modules/auth/auth.service.ts, src/modules/user/user.service.ts
 * Pattern: Static utility class
 */
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export const BcryptHelper = {
  hash: async (plainText: string): Promise<string> => {
    return bcrypt.hash(plainText, SALT_ROUNDS);
  },

  compare: async (plainText: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(plainText, hash);
  },
};
