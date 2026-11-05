import { SecretLength, Base, BASE_ALPHABETS } from '../types/game.types';

/**
 * Generates a secret number as a string of unique digits
 * @param length Length of the secret number (from 2 to 6)
 * @param base Numeral system ('bin' | 'oct' | 'dec' | 'hex')
 * @param random Source of randomness (defaults to Math.random)
 */
export const generateSecret = (length: SecretLength, base: Base, random: () => number = Math.random): string => {
  const alphabet = BASE_ALPHABETS[base];

  if (!alphabet) {
    throw new Error(`Unsupported numeral system: ${base}`);
  }

  if (length < 2 || length > 6) {
    throw new Error('The length of the secret number must be in the range of 2 to 6.');
  }

  if (length > alphabet.length) {
    throw new Error(
      `The length ${length} exceeds the number of unique digits available for the numeral system '${base}' (maximum ${alphabet.length}).`,
    );
  }

  const digits = alphabet.toLowerCase().split('');

  for (let i = 0; i < length; i++) {
    const j = i + Math.floor(random() * (digits.length - i));

    [digits[i], digits[j]] = [digits[j], digits[i]];
  }

  return digits.slice(0, length).join('');
};
