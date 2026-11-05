import { SecretLength, Base, BASE_ALPHABETS } from '../types/game.types';
import { getPermutations } from '../utils/combinatorics';

/**
 * Calculates how many distinct secret numbers exist for a given length and base
 * (the number of permutations without repetitions)
 * @param length Length of the secret number (from 2 to 6)
 * @param base Numeral system ('bin' | 'oct' | 'dec' | 'hex')
 */
export const countPossibleSecrets = (length: SecretLength, base: Base): number => {
  const alphabet = BASE_ALPHABETS[base];

  if (!alphabet) {
    throw new Error(`Unsupported numeral system: ${base}`);
  }

  const alphabetSize = alphabet.length;

  if (length < 0 || length > alphabetSize) {
    return 0;
  }

  return getPermutations(length, alphabetSize);
};
