export type Base = 'bin' | 'oct' | 'dec' | 'hex';

export type SecretLength = 2 | 3 | 4 | 5 | 6;

export type EvaluationResult = {
  bulls: number;
  cows: number;
};

export type GameStatus = 'playing' | 'won';

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
  length: SecretLength;
  base: Base;
};

export type GameState = {
  secret: string;
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
