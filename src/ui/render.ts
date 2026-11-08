import { evaluateGuess } from '../core/evaluateGuess';
import { generateSecret } from '../core/generateSecret';
import { addAttemptToState, createInitialState, setGameStatus } from '../state/state';
import { Base, SecretLength, GameState, HistoryEntry } from '../types/game.types';
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
    // Randomness is an impure input, so it is created here at the edge and handed to the pure core
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
  let elapsedTime = 0;

  const { modal, winBannerComponent, gameForm, gameBodyComponent } = createGameBoard({
    base: state.settings.base,
    length: state.settings.length,
    timeInSeconds: elapsedTime,
    onRestart: () => {
      renderStartScreen(appContainer);
    },
    onGuessSubmit: (guessValue) => {
      if (state.status !== 'playing') return;

      const isAlreadyGuessed = state.history.some((entry) => entry.guess.toLowerCase() === guessValue.toLowerCase());

      if (isAlreadyGuessed) {
        return {
          success: false,
          error: `You have already tried "${guessValue}". Try another number!`,
        };
      }

      const { bulls, cows } = evaluateGuess(state.settings.secret, guessValue);

      const historyEntry: HistoryEntry = {
        guess: guessValue,
        bulls,
        cows,
      };

      state = addAttemptToState(state, historyEntry);

      gameBodyComponent.updateHistory(state.history);

      // Win logic
      if (bulls === state.settings.length) {
        state = setGameStatus(state, 'won');
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
    const timeValueElement = document.getElementById('game-time-value');

    if (timeValueElement) {
      timeValueElement.textContent = `${currentTime} sec`;
    }
  });
};
