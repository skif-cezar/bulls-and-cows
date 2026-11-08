import { Base, HistoryEntry, SecretLength } from './game.types';

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

export interface SelectComponent {
  element: HTMLDivElement;
  getValue: () => string;
  updateOptions: (newOptions: SelectOption[], newDefaultValue?: string) => void;
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

export interface BodyModalComponent {
  element: HTMLDivElement;
  lengthSelect: SelectComponent;
  notationSelect: SelectComponent;
}

export interface GameHeaderComponent {
  gameMode: string | number;
  timeInSeconds: number;
  onRestart: () => void;
}

export interface GameBoardConfig {
  base: Base;
  length: SecretLength;
  timeInSeconds: number;
  onRestart: () => void;
  onGuessSubmit: (guess: string) => void;
}
export interface GameFormProps {
  length: SecretLength;
  base: Base;
  onGuessSubmit: (guess: string) => { success: boolean; error?: string } | void;
}

export interface WinBannerComponent {
  element: HTMLElement;
  showWin: (secret: string, attemptsCount: number, timeInSeconds: number) => void;
}

export interface GameBodyComponent {
  element: HTMLElement;
  updateHistory: (history: HistoryEntry[]) => void;
}
