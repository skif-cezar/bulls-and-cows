export interface ButtonConfig {
  text: string;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  classNames?: string[];
  attributes?: Record<string, string>;
}
