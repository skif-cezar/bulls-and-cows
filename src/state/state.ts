import { GameSettings, GameState, HistoryEntry, GameStatus } from '../types/game.types';

// Start Game initialization
export const createInitialState = (settings: GameSettings): GameState => ({
  history: [],
  settings,
  status: 'playing',
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
