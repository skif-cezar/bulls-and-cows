import { createGameHeader } from './gameHeader';

export const createGameBoard = () => {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const gameBoard = document.createElement('div');
  gameBoard.classList.add('game-board');
  gameBoard.setAttribute('role', 'region');
  gameBoard.setAttribute('aria-label', 'Game Board');
  gameBoard.tabIndex = -1;

  const gameHeader = createGameHeader({ gameMode: 111, timeInSeconds: 10 });

  gameBoard.append(gameHeader);
  modal.append(gameBoard);

  return modal;
};
