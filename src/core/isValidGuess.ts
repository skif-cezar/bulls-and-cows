import { SecretLength, Base, ValidationResult } from '../types/game.types';
import { createDigitValidator } from './createDigitValidator';

/**
 * Checks whether the length of the attempt matches the length of the secret number.
 * All characters are valid digits for the given base, and no digits are repeated
 * @param guess User attempt string
 * @param length Length of the secret number (from 2 to 6)
 * @param base Numeral system ('bin' | 'oct' | 'dec' | 'hex')
 */
export const isValidGuess = (guess: string, length: SecretLength, base: Base): ValidationResult => {
  if (guess.length !== length) {
    return {
      isValid: false,
      error: `Length error: expected ${length} characters, but got ${guess.length}.`,
    };
  }

  const isValidChar = createDigitValidator(base);
  const chars = guess.split('');

  const invalidChar = chars.find((char) => !isValidChar(char));
  if (invalidChar) {
    return {
      isValid: false,
      error: `Invalid character: "${invalidChar}" is not allowed in numeral system '${base}'.`,
    };
  }

  const normalizedChars = chars.map((char) => char.toLowerCase());
  const isUnique = new Set(normalizedChars).size === normalizedChars.length;

  if (!isUnique) {
    return {
      isValid: false,
      error: `Uniqueness error: all digits in the guess must be unique (no repeating characters).`,
    };
  }

  return { isValid: true };
};
