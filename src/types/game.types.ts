export type Base = 'bin' | 'oct' | 'dec' | 'hex';

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
