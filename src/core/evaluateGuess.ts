import { EvaluationResult } from '../types/game.types';

/**
 * Compares the attempt (guess) with the secret number (secret)
 * @param secret A secret number as a string
 * @param guess User attempt string
 */
export const evaluateGuess = (secret: string, guess: string): EvaluationResult => {
  const secretChars = secret.split('');
  const guessChars = guess.split('');

  if (guessChars.length !== secretChars.length) {
    throw new Error(`The number of characters in a number must be: ${secretChars.length}`);
  }

  const bulls = guessChars.filter((char, index) => char === secretChars[index]).length;

  const totalMatches = guessChars.filter((char) => secretChars.includes(char)).length;

  const cows = totalMatches - bulls;

  return { bulls, cows };
};
