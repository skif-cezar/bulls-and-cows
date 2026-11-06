import { createButton } from '../button/button';

export const createGameForm = () => {
  const btnEnter = createButton({
    text: 'Enter',
    id: 'btn-enter-game',
    attributes: {
      'aria-label': 'Enter',
    },
  });

  const form = document.createElement('form');
  form.classList.add('guess-form');
  form.id = 'guess-form';

  const input = document.createElement('input');
  input.classList.add('guess-input');
  input.id = 'guess-input';
  input.maxLength = 4;
  input.type = 'text';
  input.placeholder = `Enter ${4} number`;
  input.autocomplete = 'off';
  input.autofocus = true;

  form.append(input, btnEnter);

  return form;
};
