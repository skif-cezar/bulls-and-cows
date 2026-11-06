import { GameHeaderComponent } from '../../../types/ui.types';
import { createButton } from '../button/button';

export const createGameHeader = ({ gameMode, timeInSeconds }: GameHeaderComponent): HTMLDivElement => {
  const btnRestartGame = createButton({
    text: 'Restart Game',
    id: 'btn-restart-game',
    attributes: {
      'aria-label': 'Restart Game',
    },
  });

  const gameHeader = document.createElement('div');
  gameHeader.classList.add('game-header');

  const gameMeta = document.createElement('div');
  gameMeta.classList.add('game-meta');

  const gameModeSpan = document.createElement('span');
  gameModeSpan.classList.add('game-mode');
  gameModeSpan.textContent = `Game mode: ${gameMode}`;

  const gameTimeSpan = document.createElement('span');
  gameTimeSpan.classList.add('game-time');
  gameTimeSpan.textContent = 'Time: ';

  const gameTimeValue = document.createElement('strong');
  gameTimeValue.classList.add('time-value');
  gameTimeValue.textContent = `${timeInSeconds} sec`;

  gameTimeSpan.append(gameTimeValue);
  gameMeta.append(gameModeSpan, gameTimeSpan);
  gameHeader.append(btnRestartGame, gameMeta);

  return gameHeader;
};
