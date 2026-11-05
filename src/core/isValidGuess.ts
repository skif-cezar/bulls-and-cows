import { SecretLength, Base } from '../types/game.types';
import { createDigitValidator } from './createDigitValidator';

/**
 * Checks whether the length of the attempt matches the length of the secret number.
 * All characters are valid digits for the given base, and no digits are repeated
 * @param guess User attempt string
 * @param length Length of the secret number (from 2 to 6)
 * @param base Numeral system ('bin' | 'oct' | 'dec' | 'hex')
 */
export const isValidGuess = (guess: string, length: SecretLength, base: Base): boolean => {
  if (guess.length !== length) {
    return false;
  }

  const isValidChar = createDigitValidator(base);
  const chars = guess.split('');

  const isEveryCharValid = chars.every((char) => isValidChar(char));

  if (!isEveryCharValid) {
    return false;
  }

  const normalizedChars = chars.map((char) => char.toLowerCase());
  const isUnique = new Set(normalizedChars).size === normalizedChars.length;

  if (!isUnique) {
    return false;
  }

  return true;
};
