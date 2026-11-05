import { createButton } from './button/button';
import { createSelect } from './select/select';

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

  const notationOptions = [
    { value: 'bin', label: 'bin' },
    { value: 'oct', label: 'oct' },
    { value: 'dec', label: 'dec' },
    { value: 'hex', label: 'hex' },
  ];

  const notationSelect = createSelect({
    text: 'Notation:',
    name: 'notation',
    id: 'notation-select',
    options: notationOptions,
    defaultValue: 'dec',

    onChange: (value: string) => {
      // eslint-disable-next-line no-console
      console.log('Choosed notation:', value);
    },
  });

  app.append(btnStartGame, notationSelect.element);

  return app;
};
