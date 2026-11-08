import { SecretLength, Base } from '../types/game.types';
import { isValidGuess } from './isValidGuess';

describe('isValidGuess()', () => {
  describe('Успешная валидация', () => {
    it('должен возвращать true для корректной десятичной попытки уникальной длины', () => {
      const guess: string = '1234';
      const length: SecretLength = 4;
      const base: Base = 'dec';

      const result = isValidGuess(guess, length, base);

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('должен возвращать true для шестнадцатеричной попытки с буквенными символами', () => {
      const guess: string = '1a2b';
      const length: SecretLength = 4;
      const base: Base = 'hex';

      const result = isValidGuess(guess, length, base);

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe('Проверка длины попытки', () => {
    it('должен возвращать false, если длина попытки меньше ожидаемой', () => {
      const guess: string = '123';
      const length: SecretLength = 4;
      const base: Base = 'dec';

      const result = isValidGuess(guess, length, base);

      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('Length error');
    });

    it('должен возвращать false, если длина попытки больше ожидаемой', () => {
      const guess: string = '12345';
      const length: SecretLength = 4;
      const base: Base = 'dec';

      const result = isValidGuess(guess, length, base);

      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('Length error');
    });
  });

  describe('Проверка алфавита системы счисления', () => {
    it('должен возвращать false, если попытка содержит символы, не входящие в систему счисления', () => {
      // '2' does not exist in the binary system ('bin')
      const guess: string = '02';
      const length: SecretLength = 2;
      const base: Base = 'bin';

      const result = isValidGuess(guess, length, base);

      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('Invalid character');
    });

    it('должен возвращать false при наличии недопустимых буквенных символов для десятичной системы', () => {
      const guess: string = '123x';
      const length: SecretLength = 4;
      const base: Base = 'dec';

      const result = isValidGuess(guess, length, base);

      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('Invalid character');
    });
  });

  describe('Проверка уникальности цифр', () => {
    it('должен возвращать false, если в попытке есть повторяющиеся цифры', () => {
      const guess: string = '1224';
      const length: SecretLength = 4;
      const base: Base = 'dec';

      const result = isValidGuess(guess, length, base);

      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('Uniqueness error');
    });

    it('должен возвращать false, если все цифры одинаковые', () => {
      const guess: string = '5555';
      const length: SecretLength = 4;
      const base: Base = 'dec';

      const result = isValidGuess(guess, length, base);

      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('Uniqueness error');
    });
  });
});
