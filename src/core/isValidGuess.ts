import { SecretLength, Base, BASE_ALPHABETS } from '../types/game.types';

/**
 * Checks whether the length of the attempt matches the length of the secret number.
 * All characters are valid digits for the given base, and no digits are repeated
 * @param guess User attempt string
 * @param length Length of the secret number (from 2 to 6)
 * @param base Numeral system ('bin' | 'oct' | 'dec' | 'hex')
 */
export const isValidGuess = (guess: string, length: SecretLength, base: Base): boolean => {
  const alphabet = BASE_ALPHABETS[base];

  if (!alphabet) {
    return false;
  }

  if (guess.length !== length) {
    return false;
  }

  const chars = guess.split('');

  const isEveryCharValid = chars.every((char) => alphabet.includes(char));

  if (!isEveryCharValid) {
    return false;
  }

  const isUnique = new Set(chars).size === chars.length;

  if (!isUnique) {
    return false;
  }

  return true;
};
