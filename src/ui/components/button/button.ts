import { ButtonConfig } from '../../../types/ui.types';

export const createButton = ({
  text,
  id,
  type = 'button',
  classNames = [],
  attributes = {},
}: ButtonConfig): HTMLButtonElement => {
  const button = document.createElement('button');
  button.type = type;
  button.classList.add('button', ...classNames);
  button.textContent = text;

  if (id) {
    button.id = id;
  }

  Object.entries(attributes).forEach(([key, value]) => {
    button.setAttribute(key, value);
  });

  return button;
};
