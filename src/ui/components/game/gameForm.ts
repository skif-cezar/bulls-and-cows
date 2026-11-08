import { createDigitValidator } from '../../../core/createDigitValidator';
import { isValidGuess } from '../../../core/isValidGuess';
import { GameFormProps } from '../../../types/ui.types';
import { createButton } from '../button/button';

export const createGameForm = ({ length, base, onGuessSubmit }: GameFormProps) => {
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

  const inputContainer = document.createElement('div');
  inputContainer.classList.add('input-container');

  const input = document.createElement('input');
  input.classList.add('guess-input');
  input.id = 'guess-input';
  input.maxLength = length;
  input.type = 'text';
  input.placeholder = `Enter ${length} number`;
  input.autocomplete = 'off';
  input.autofocus = true;

  const errorContainer = document.createElement('div');
  errorContainer.classList.add('guess-error-message');

  inputContainer.append(input, errorContainer);

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
    if (errorContainer.textContent) {
      errorContainer.textContent = '';
      input.classList.remove('error');
    }

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
    const validation = isValidGuess(value, length, base);

    if (!validation.isValid) {
      console.warn('Validation failed:', validation.error);

      errorContainer.textContent = validation.error || 'Invalid input';
      input.classList.add('error');

      return;
    }

    errorContainer.textContent = '';

    const result = onGuessSubmit(value);

    if (result && !result.success) {
      errorContainer.textContent = result.error || 'This guess has already been made';
      input.classList.add('error');

      return;
    }

    input.value = '';
  });

  form.append(inputContainer, btnEnter);

  return form;
};
