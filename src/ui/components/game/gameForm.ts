import { createDigitValidator } from '../../../core/createDigitValidator';
import { gameFormComponent } from '../../../types/ui.types';
import { createButton } from '../button/button';

export const createGameForm = ({ length, base }: gameFormComponent) => {
  const isValidDigit = createDigitValidator(base);

  const btnEnter = createButton({
    type: 'submit',
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
  input.maxLength = length;
  input.type = 'text';
  input.placeholder = `Enter ${length} number`;
  input.autocomplete = 'off';
  input.autofocus = true;

  input.addEventListener('keydown', (event: KeyboardEvent) => {
    if (
      event.key === 'Backspace' ||
      event.key === 'Delete' ||
      event.key === 'Tab' ||
      event.key === 'Enter' ||
      event.key.startsWith('Arrow') ||
      event.ctrlKey ||
      event.metaKey
    ) {
      return;
    }

    if (!isValidDigit(event.key)) {
      event.preventDefault();
    }
  });

  input.addEventListener('input', () => {
    const filteredValue = input.value
      .split('')
      .filter((char) => isValidDigit(char))
      .join('');

    if (input.value !== filteredValue) {
      input.value = filteredValue;
    }
  });

  form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();

    const value = input.value.trim();

    if (value.length) {
      // eslint-disable-next-line no-console
      console.log('value: ', value);
    } else {
      // eslint-disable-next-line no-console
      console.log('Введите символ');
    }

    input.value = '';
  });

  form.append(input, btnEnter);

  return form;
};
