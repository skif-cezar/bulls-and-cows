import { ModalConfig } from '../../../types/ui.types';

export const createModal = ({
  text,
  classNames = ['modal'],
  bodyContent = null,
  actionsContent = [],
  attributesDialog = {},
  attributesModal = {},
}: ModalConfig) => {
  const modal = document.createElement('div');
  modal.classList.add(...classNames);

  Object.entries(attributesModal).forEach(([key, value]) => {
    if (value !== undefined) {
      modal.setAttribute(key, value);
    }
  });

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog');
  modalDialog.setAttribute('role', 'dialog');
  modalDialog.setAttribute('tabindex', '-1');

  Object.entries(attributesDialog).forEach(([key, value]) => {
    if (value !== undefined) {
      modalDialog.setAttribute(key, value);
    }
  });

  const title = document.createElement('h1');
  title.classList.add('modal-title');
  title.textContent = text;

  modalDialog.append(title);

  if (bodyContent) {
    modalDialog.append(bodyContent);
  }

  if (actionsContent && actionsContent.length > 0) {
    const actions = document.createElement('div');
    actions.classList.add('modal-actions');
    actions.append(...actionsContent);
    modalDialog.append(actions);
  }

  modal.append(modalDialog);

  return modal;
};
