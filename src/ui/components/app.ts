import { createButton } from './button/button';

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

  app.append(btnStartGame);

  return app;
};
