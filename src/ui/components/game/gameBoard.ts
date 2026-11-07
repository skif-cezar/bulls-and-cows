import { GameBoardConfig } from '../../../types/ui.types';
import { createGameBody } from './gameBody';
import { createGameForm } from './gameForm';
import { createGameHeader } from './gameHeader';
import { createWinBanner } from './gameWinBanner';

export const createGameBoard = ({ base, length, timeInSeconds, onRestart, onGuessSubmit }: GameBoardConfig) => {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const gameBoard = document.createElement('article');
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
  const winBannerComponent = createWinBanner();
  const gameForm = createGameForm({ length, base, onGuessSubmit });
  const gameBody = createGameBody();

  gameBoard.append(gameHeader, winBannerComponent.element, gameForm, gameBody);
  modal.append(gameBoard);

  return {
    modal,
    winBannerComponent,
    gameForm,
  };
};
