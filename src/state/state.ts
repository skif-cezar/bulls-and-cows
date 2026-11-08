import { evaluateGuess } from '../core/evaluateGuess';
import { GameSettings, GameState, HistoryEntry, GameStatus, GuessProcessResult } from '../types/game.types';

/** Start Game initialization */
export const createInitialState = (secret: string, settings: GameSettings): GameState => ({
  secret,
  history: [],
  settings,
  status: 'playing',
  elapsedSeconds: 0,
});

/**
 * Add a new attempt to the game history
 */
export const addAttemptToState = (state: GameState, entry: HistoryEntry): GameState => {
  return {
    ...state,
    history: [...state.history, entry],
  };
};

/**
 * Update the game status (for example, win or loss)
 */
export const setGameStatus = (state: GameState, status: GameStatus): GameState => {
  return {
    ...state,
    status,
  };
};

/**
 * Business logic handler for processing a user's guess attempt
 */
export const processGuess = (state: GameState, guessValue: string): GuessProcessResult => {
  if (state.status !== 'playing') {
    return { success: false, error: 'Game is over', newState: state };
  }

  // Check for duplicate attempts
  const isAlreadyGuessed = state.history.some((entry) => entry.guess.toLowerCase() === guessValue.toLowerCase());

  if (isAlreadyGuessed) {
    return {
      success: false,
      error: `You have already tried "${guessValue}". Try another number!`,
      newState: state,
    };
  }

  // Comparison with a secret number
  const { bulls, cows } = evaluateGuess(state.secret, guessValue);

  const historyEntry: HistoryEntry = {
    guess: guessValue,
    bulls,
    cows,
  };

  let newState = addAttemptToState(state, historyEntry);
  const isWin = bulls === state.settings.length;

  if (isWin) {
    newState = setGameStatus(newState, 'won');
  }

  return {
    success: true,
    newState,
    isWin,
  };
};
