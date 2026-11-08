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

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export type HistoryEntry = {
  guess: string;
  bulls: number;
  cows: number;
};

export type GameSettings = {
  secret: string;
  length: SecretLength;
  base: Base;
};

export type GameState = {
  history: HistoryEntry[];
  settings: GameSettings;
  status: GameStatus;
  elapsedSeconds: number;
};

export interface RecordItem {
  id: string;
  attempts: number;
  time: number;
  base: Base;
  length: SecretLength;
  date: string;
}

export interface GuessProcessResult {
  success: boolean;
  error?: string;
  newState: GameState;
  isWin?: boolean;
}
