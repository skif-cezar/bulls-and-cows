export interface ButtonConfig {
  text: string;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  classNames?: string[];
  attributes?: Record<string, string>;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectConfig {
  text: string;
  name: string;
  id: string;
  options: SelectOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export interface ModalConfig {
  text: string;
  classNames?: string[];
  bodyContent: HTMLDivElement | null;
  actionsContent: HTMLButtonElement[];
  attributesDialog?: {
    'aria-modal'?: string;
    'aria-label'?: string;
    [key: string]: string | undefined;
  };
  attributesModal?: {
    [key: string]: string | undefined;
  };
}
