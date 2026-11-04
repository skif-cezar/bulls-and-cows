import { SecretLength, Base } from '../types/game.types';

export const generateSecret = (length: SecretLength, base: Base, _random: () => number = Math.random): string => {
  throw new Error('Not implemented');
};
