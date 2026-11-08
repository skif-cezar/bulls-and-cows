import { Base } from '../types/game.types';
import { BASE_ALPHABETS } from './constants';

/**
 * Given a numeral system, it returns a predicate function: "this character is a valid digit
 * in this system"
 * @param base Numeral system ('bin' | 'oct' | 'dec' | 'hex')
 */
export const createDigitValidator = (base: Base): ((char: string) => boolean) => {
  const alphabet = BASE_ALPHABETS[base];

  if (!alphabet) {
    return () => false;
  }

  return (char: string): boolean => {
    if (typeof char !== 'string' || char.length !== 1) {
      return false;
    }

    const normalizedChar = char.toLowerCase();

    return alphabet.includes(normalizedChar);
  };
};
