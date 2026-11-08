import { SecretLength, Base } from '../types/game.types';
import { getAlphabet, MAX_SECRET_LENGTH, MIN_SECRET_LENGTH } from './constants';

/** The pool without the item at `index`; the input is left untouched */
const withoutIndex = (pool: ReadonlyArray<string>, index: number): ReadonlyArray<string> => [
  ...pool.slice(0, index),
  ...pool.slice(index + 1),
];

/**
 * Recursively draws `count` distinct digits: pick one at random, remove it from the pool, repeat with count - 1.
 * Because a drawn digit leaves the pool, uniqueness holds by construction.
 */
const pickDistinct = (pool: ReadonlyArray<string>, count: number, random: () => number): ReadonlyArray<string> => {
  if (count === 0) {
    return [];
  }

  // Math.min protects against a random() that returns exactly 1
  const index = Math.min(Math.floor(random() * pool.length), pool.length - 1);

  return [pool[index], ...pickDistinct(withoutIndex(pool, index), count - 1, random)];
};

/**
 * Generates a secret number as a string of unique digits.
 * The function is pure with respect to its arguments: the source of randomness is injected,
 * so the same `random` sequence always gives the same secret.
 *
 * @param length Length of the secret number (from 2 to 6)
 * @param base Numeral system ('bin' | 'oct' | 'dec' | 'hex')
 * @param random Source of randomness returning a number in [0, 1), e.g. Math.random
 */
export const generateSecret = (length: SecretLength, base: Base, random: () => number): string => {
  const alphabet = getAlphabet(base);

  if (alphabet === undefined) {
    throw new Error(`Unsupported numeral system: ${base}`);
  }

  if (length < MIN_SECRET_LENGTH || length > MAX_SECRET_LENGTH) {
    throw new Error(
      `The length of the secret number must be in the range of ${MIN_SECRET_LENGTH} to ${MAX_SECRET_LENGTH}.`,
    );
  }

  if (length > alphabet.length) {
    throw new Error(
      `The length ${length} exceeds the number of unique digits available for the numeral system '${base}' (maximum ${alphabet.length}).`,
    );
  }

  return pickDistinct(Array.from(alphabet), length, random).join('');
};
