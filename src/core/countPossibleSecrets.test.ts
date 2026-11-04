import { SecretLength, Base } from '../types/game.types';
import { countPossibleSecrets } from './countPossibleSecrets';

describe('countPossibleSecrets()', () => {
  describe('Двоичная система (bin, размер алфавита = 2)', () => {
    it('должен правильно считать количество комбинаций для длины 2', () => {
      // P(2, 2) = 2 * 1 = 2 (example: "01", "10")
      const length: SecretLength = 2;
      const base: Base = 'bin';

      const count: number = countPossibleSecrets(length, base);

      expect(count).toBe(2);
    });
  });

  describe('Восьмеричная система (oct, размер алфавита = 8)', () => {
    it('должен правильно считать комбинации для длины 3', () => {
      // P(8, 3) = 8 * 7 * 6 = 336
      const length: SecretLength = 3;
      const base: Base = 'oct';

      const count: number = countPossibleSecrets(length, base);

      expect(count).toBe(336);
    });
  });

  describe('Десятичная система (dec, размер алфавита = 10)', () => {
    it('должен правильно считать комбинации для длины 4', () => {
      // P(10, 4) = 10 * 9 * 8 * 7 = 5040
      const length: SecretLength = 4;
      const base: Base = 'dec';

      const count: number = countPossibleSecrets(length, base);

      expect(count).toBe(5040);
    });

    it('должен правильно считать комбинации для максимальной длины 6', () => {
      // P(10, 6) = 10 * 9 * 8 * 7 * 6 * 5 = 151200
      const length: SecretLength = 6;
      const base: Base = 'dec';

      const count: number = countPossibleSecrets(length, base);

      expect(count).toBe(151200);
    });
  });

  describe('Мемоизация и производительность', () => {
    it('должен возвращать идентичный результат при повторных вызовах (проверка кэша)', () => {
      const length: SecretLength = 5;
      const base: Base = 'hex'; // Size 16: P(16, 5) = 16 * 15 * 14 * 13 * 12 = 524160

      const firstCall = countPossibleSecrets(length, base);
      const secondCall = countPossibleSecrets(length, base);

      expect(firstCall).toBe(secondCall);
      expect(firstCall).toBe(524160);
    });
  });
});
