import { generateSecret } from '../core/generateSecret';
import { createInitialState, processGuess } from '../state/state';
import { Base, SecretLength, GameState } from '../types/game.types';
import { clearGameTimer, startGameTimer } from '../utils/gameTimer';
import { addRecord, getRecords } from '../utils/records';
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
    const secret = generateSecret(length, base, Math.random);

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
  let elapsedTime = state.elapsedSeconds;

  const { modal, winBannerComponent, gameForm, gameBodyComponent } = createGameBoard({
    base: state.settings.base,
    length: state.settings.length,
    timeInSeconds: elapsedTime,
    onRestart: () => {
      renderStartScreen(appContainer);
    },
    onGuessSubmit: (guessValue) => {
      const result = processGuess(state, guessValue);

      if (!result.success) {
        return { success: false, error: result.error };
      }

      state = result.newState;

      gameBodyComponent.updateHistory(state.history);

      // Win logic
      if (result.isWin) {
        clearGameTimer();

        winBannerComponent.showWin(state.settings.secret, state.history.length, elapsedTime);

        const updatedRecords = addRecord({
          attempts: state.history.length,
          time: elapsedTime,
          base: state.settings.base,
          length: state.settings.length,
        });
        gameBodyComponent.updateRecords(updatedRecords);

        const guessInput = gameForm.querySelector('#guess-input') as HTMLInputElement;
        const submitBtn = gameForm.querySelector('button');
        if (guessInput) guessInput.disabled = true;
        if (submitBtn) submitBtn.setAttribute('disabled', 'true');
      }

      return { success: true };
    },
  });

  gameBodyComponent.updateRecords(getRecords());
  appContainer.replaceChildren(modal);

  startGameTimer((currentTime) => {
    elapsedTime = currentTime;
    state.elapsedSeconds = currentTime;
    const timeValueElement = document.getElementById('game-time-value');

    if (timeValueElement) {
      timeValueElement.textContent = `${currentTime} sec`;
    }
  });
};
