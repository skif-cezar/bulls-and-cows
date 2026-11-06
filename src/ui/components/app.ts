import { renderStartScreen } from '../render';

export const createApp = (): HTMLDivElement => {
  const app = document.createElement('div');
  app.classList.add('app');

  renderStartScreen(app);

  return app;
};
