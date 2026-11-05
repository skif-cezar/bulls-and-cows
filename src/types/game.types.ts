export type Base = 'bin' | 'oct' | 'dec' | 'hex';

export const BASE_ALPHABETS: Record<Base, string> = {
  bin: '01',
  oct: '01234567',
  dec: '0123456789',
  hex: '0123456789abcdef',
};

export type SecretLength = 2 | 3 | 4 | 5 | 6;

export type EvaluationResult = {
  bulls: number;
  cows: number;
};

export type GameStatus = 'playing' | 'won' | 'lost';

export type HistoryEntry = {
  guess: string;
  bulls: number;
  cows: number;
};

export type GameSettings = {
  length: SecretLength;
  base: Base;
};

export type GameState = {
  history: HistoryEntry[];
  settings: GameSettings;
  status: GameStatus;
};
