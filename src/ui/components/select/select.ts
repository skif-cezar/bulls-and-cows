import { SelectConfig } from '../../../types/ui.types';

export const createSelect = ({ text, name, id, options, defaultValue, onChange }: SelectConfig) => {
  const selectContainer = document.createElement('div');
  selectContainer.classList.add('container-select');

  const label = document.createElement('label');
  label.classList.add('title-select');
  label.setAttribute('for', id);
  label.textContent = text;

  const select = document.createElement('select');
  select.classList.add('select');
  select.name = name;
  select.id = id;

  options.forEach((optData) => {
    const option = document.createElement('option');
    option.value = optData.value;
    option.textContent = optData.label;

    if (defaultValue !== undefined && optData.value === defaultValue) {
      option.selected = true;
    }

    select.appendChild(option);
  });

  selectContainer.append(label, select);

  if (onChange) {
    select.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      onChange(target.value);
    });
  }

  return {
    element: selectContainer,
    getValue: () => select.value,
  };
};
