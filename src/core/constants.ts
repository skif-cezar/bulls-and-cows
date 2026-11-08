import { Base, SecretLength } from '../types/game.types';

/** Alphabet of every supported numeral system (the single source of truth for the whole game) */
export const BASE_ALPHABETS: Readonly<Record<Base, string>> = Object.freeze({
  bin: '01',
  oct: '01234567',
  dec: '0123456789',
  hex: '0123456789abcdef',
});

export const BASES: ReadonlyArray<Base> = Object.freeze(['bin', 'oct', 'dec', 'hex'] as const);

export const SECRET_LENGTHS: ReadonlyArray<SecretLength> = Object.freeze([2, 3, 4, 5, 6] as const);

export const MIN_SECRET_LENGTH = 2;
export const MAX_SECRET_LENGTH = 6;

/**
 * Safe alphabet lookup: unlike `BASE_ALPHABETS[base]` it does not pick up inherited keys
 * such as 'constructor' or 'toString' when an unknown value sneaks in at runtime.
 */
export const getAlphabet = (base: Base): string | undefined =>
  Object.hasOwn(BASE_ALPHABETS, base) ? BASE_ALPHABETS[base] : undefined;

export const isBase = (value: string): value is Base => BASES.some((base) => base === value);

export const isSecretLength = (value: number): value is SecretLength =>
  SECRET_LENGTHS.some((length) => length === value);
