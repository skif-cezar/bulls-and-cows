export type Base = 'bin' | 'oct' | 'dec' | 'hex';

export type SecretLength = 2 | 3 | 4 | 5 | 6;

export type EvaluationResult = {
  readonly bulls: number;
  readonly cows: number;
};

export type GameStatus = 'playing' | 'won';

export interface ValidationResult {
  readonly isValid: boolean;
  readonly error?: string;
}

export type HistoryEntry = {
  readonly guess: string;
  readonly bulls: number;
  readonly cows: number;
};

export type GameSettings = {
  readonly length: SecretLength;
  readonly base: Base;
};

export type GameState = {
  readonly secret: string;
  readonly history: HistoryEntry[];
  readonly settings: GameSettings;
  readonly status: GameStatus;
  readonly elapsedSeconds: number;
};

export interface RecordItem {
  readonly id: string;
  readonly attempts: number;
  readonly time: number;
  readonly base: Base;
  readonly length: SecretLength;
  readonly date: string;
}

export interface GuessProcessResult {
  readonly success: boolean;
  readonly error?: string;
  readonly newState: GameState;
  readonly isWin?: boolean;
}
