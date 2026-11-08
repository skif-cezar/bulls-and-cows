import { EvaluationResult } from '../types/game.types';

/**
 * Compares a guess with the secret.
 * bull = right digit on the right position, cow = right digit on a wrong position.
 *
 * Precondition (guaranteed by generateSecret / isValidGuess): digits inside each string are unique.
 *
 * @param secret A secret number as a string
 * @param guess User attempt string
 * @throws if the lengths differ (a programming error, not a user error)
 */
export const evaluateGuess = (secret: string, guess: string): EvaluationResult => {
  const secretChars = Array.from(secret.toLowerCase());
  const guessChars = Array.from(guess.toLowerCase());

  if (guessChars.length !== secretChars.length) {
    throw new Error(`The number of characters in a number must be: ${secretChars.length}`);
  }

  const secretSet: ReadonlySet<string> = new Set(secretChars);

  const bulls = guessChars.filter((char, index) => char === secretChars[index]).length;
  const common = guessChars.filter((char) => secretSet.has(char)).length;

  return { bulls, cows: common - bulls };
};
