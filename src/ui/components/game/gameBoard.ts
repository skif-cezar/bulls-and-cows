import { GameBoardConfig } from '../../../types/ui.types';
import { createGameForm } from './gameForm';
import { createGameHeader } from './gameHeader';

export const createGameBoard = ({ base, length, timeInSeconds, onRestart }: GameBoardConfig) => {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const gameBoard = document.createElement('div');
  gameBoard.classList.add('game-board');
  gameBoard.setAttribute('role', 'region');
  gameBoard.setAttribute('aria-label', 'Game Board');
  gameBoard.tabIndex = -1;

  const gameMode = `${base} (${length})`;
  const gameHeader = createGameHeader({
    gameMode: gameMode.toUpperCase(),
    timeInSeconds: timeInSeconds,
    onRestart,
  });
  const gameForm = createGameForm();

  gameBoard.append(gameHeader, gameForm);
  modal.append(gameBoard);

  return modal;
};
