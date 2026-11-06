import { countPossibleSecrets } from '../../../core/countPossibleSecrets';
import { SecretLength, Base } from '../../../types/game.types';
import { BodyModalComponent, SelectOption } from '../../../types/ui.types';
import { getAvailableLengthOptions } from '../../../utils/getAvailableLengthOptions';
import { createSelect } from '../select/select';

export const createBodyModal = (): BodyModalComponent => {
  const body = document.createElement('div');
  body.classList.add('modal-body');

  const notationOptions: SelectOption[] = [
    { value: 'bin', label: 'Binary (bin)' },
    { value: 'oct', label: 'Octal (oct)' },
    { value: 'dec', label: 'Decimal (dec)' },
    { value: 'hex', label: 'Hexadecimal (hex)' },
  ];

  const allLengthOptions: SelectOption[] = [
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
  ];

  const defaultNotation = 'dec';
  const defaultLength = '4';

  const lengthSelect = createSelect({
    text: 'Length of the secret number:',
    name: 'length',
    id: 'length-select',
    options: getAvailableLengthOptions(defaultNotation, allLengthOptions),
    defaultValue: defaultLength,
    onChange: () => {
      updateCombinations();
    },
  });

  const notationSelect = createSelect({
    text: 'Notation:',
    name: 'notation',
    id: 'notation-select',
    options: notationOptions,
    defaultValue: defaultNotation,
    onChange: (notationValue: string) => {
      const newOptions = getAvailableLengthOptions(notationValue, allLengthOptions);

      lengthSelect.updateOptions(newOptions);
      updateCombinations();
    },
  });

  const combinations = document.createElement('span');
  combinations.classList.add('modal-combinations');

  const updateCombinations = () => {
    const length = Number(lengthSelect.getValue()) as SecretLength;
    const notation = notationSelect.getValue() as Base;
    combinations.textContent = countPossibleSecrets(length, notation).toString();
  };

  const message = document.createElement('p');
  message.classList.add('modal-message');
  message.textContent = 'Unique combinations: ';

  message.appendChild(combinations);
  body.append(notationSelect.element, lengthSelect.element, message);

  updateCombinations();

  return {
    element: body,
    lengthSelect,
    notationSelect,
  };
};
