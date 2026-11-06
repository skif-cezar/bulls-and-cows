import { createInitialState } from '../state/state';
import { Base, SecretLength, GameState } from '../types/game.types';
import { createButton } from './components/button/button';
import { createGameBoard } from './components/game/gameBoard';
import { createBodyModal } from './components/modal/bodyModal';
import { createModal } from './components/modal/modal';

/**
 * Render of the start screen with settings
 */
export const renderStartScreen = (appContainer: HTMLDivElement): void => {
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

    const initialState = createInitialState({ base, length });

    renderGameScreen(appContainer, initialState);
  });

  appContainer.replaceChildren(startModal);
};

/**
 * Render the game board (game screen)
 */
export const renderGameScreen = (appContainer: HTMLDivElement, _state: GameState): void => {
  const gameBoard = createGameBoard();

  /*const title = document.createElement('h2');
  title.textContent = `Game in progress (${state.settings.base.toUpperCase()}, length: ${state.settings.length})`;

  const restartBtn = createButton({
    text: 'New Game / Settings',
    id: 'btn-restart-game',
  });

  // Кнопка для возврата к настройкам (новый раунд)
  restartBtn.addEventListener('click', () => {
    renderStartScreen(appContainer);
  });

  gameBoard.append(title, restartBtn);*/

  // Безопасно очищаем контейнер и вставляем игровое поле (модалка удаляется из памяти)
  appContainer.replaceChildren(gameBoard);
};
