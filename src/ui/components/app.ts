import { createButton } from './button/button';
import { createBodyModal } from './modal/bodyModal';
import { createModal } from './modal/modal';

export const createApp = (): HTMLDivElement => {
  const app = document.createElement('div');
  app.classList.add('app');

  const btnStartGame = createButton({
    text: 'Start round',
    id: 'btn-start-game',
    attributes: {
      'aria-label': 'Start round',
    },
  });

  const startModal = createModal({
    text: 'Bulls and Cows!',
    attributesModal: {
      'aria-hidden': 'false',
    },
    bodyContent: createBodyModal(),
    actionsContent: [btnStartGame],
    attributesDialog: {
      'aria-modal': 'true',
      'aria-label': 'Bulls and Cows!',
    },
  });

  app.append(startModal);

  return app;
};
