import { generateSecret } from '../core/generateSecret';
import { createInitialState } from '../state/state';
import { Base, SecretLength, GameState } from '../types/game.types';
import { clearGameTimer, startGameTimer } from '../utils/gameTimer';
import { createButton } from './components/button/button';
import { createGameBoard } from './components/game/gameBoard';
import { createBodyModal } from './components/modal/bodyModal';
import { createModal } from './components/modal/modal';

/**
 * Render of the start screen with settings
 */
export const renderStartScreen = (appContainer: HTMLDivElement): void => {
  clearGameTimer();

  const bodyModalData = createBodyModal();

  const btnStartGame = createButton({
    text: 'Start round',
    id: 'btn-start-game',
    attributes: {
      'aria-label': 'Start round',
    },
  });

  const startModal = createModal({
    text: 'Bulls and Cows!',
    bodyContent: bodyModalData.element,
    actionsContent: [btnStartGame],
    attributesDialog: {
      'aria-modal': 'true',
      'aria-label': 'Bulls and Cows!',
    },
  });

  btnStartGame.addEventListener('click', () => {
    const base = bodyModalData.notationSelect.getValue() as Base;
    const length = Number(bodyModalData.lengthSelect.getValue()) as SecretLength;
    const secret = generateSecret(length, base);

    // eslint-disable-next-line no-console
    console.log('Generated Secret:', secret);

    const initialState = createInitialState({ base, length, secret });

    renderGameScreen(appContainer, initialState);
  });

  appContainer.replaceChildren(startModal);
};

/**
 * Render the game board (game screen)
 */
export const renderGameScreen = (appContainer: HTMLDivElement, state: GameState): void => {
  const gameBoard = createGameBoard({
    base: state.settings.base,
    length: state.settings.length,
    timeInSeconds: 0,
    onRestart: () => {
      renderStartScreen(appContainer);
    },
  });

  appContainer.replaceChildren(gameBoard);

  startGameTimer((currentTime) => {
    const timeValueElement = document.getElementById('game-time-value');
    if (timeValueElement) {
      timeValueElement.textContent = `${currentTime} sec`;
    }
  });
};
