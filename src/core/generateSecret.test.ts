import { generateSecret } from './generateSecret';
import { Base, SecretLength } from '../types/game.types';

describe('generateSecret()', () => {
  // Returns sequential values that are convenient for verifying calculations
  const createMockRandom = (values: number[]) => {
    let index = 0;

    return () => {
      const val = values[index];
      index = (index + 1) % values.length;
      return val;
    };
  };

  describe('Успешная генерация', () => {
    it('должен сгенерировать корректное секретное число для десятичной системы (dec)', () => {
      // For dec, the alphabet is: '0123456789' (10 characters)
      const mockRandom = createMockRandom([0.1, 0.2, 0.3, 0.4]);
      const length: SecretLength = 4;
      const base: Base = 'dec';

      const secret: string = generateSecret(length, base, mockRandom);

      expect(typeof secret).toBe('string');
      expect(secret).toHaveLength(4);

      // Checking for the uniqueness of the digits
      const uniqueDigits = new Set(secret.split(''));
      expect(uniqueDigits.size).toBe(4);

      // Checking whether the characters belong to the decimal (dec) numeral system
      for (const char of secret) {
        expect(parseInt(char, 10)).toBeGreaterThanOrEqual(0);
        expect(parseInt(char, 10)).toBeLessThanOrEqual(9);
      }
    });

    it('должен сгенерировать корректное секретное число для шестнадцатеричной системы (hex)', () => {
      // Hex alphabet: '0123456789abcdef' (16 characters)
      const mockRandom = createMockRandom([0.9, 0.5, 0.1]);
      const length: SecretLength = 3;
      const base: Base = 'hex';

      const secret: string = generateSecret(length, base, mockRandom);

      expect(typeof secret).toBe('string');
      expect(secret).toHaveLength(3);

      // Checking for the uniqueness of the digits
      const uniqueDigits = new Set(secret.split(''));
      expect(uniqueDigits.size).toBe(3);

      const validHexChars = /^[0-9a-f]+$/;
      expect(secret).toMatch(validHexChars);
    });

    it('должен корректно работать с минимальной длиной (2) для двоичной системы (bin)', () => {
      // Bin alphabet: '01' (2 characters). Maximum length = 2
      const mockRandom = createMockRandom([0.1, 0.9]);
      const length: SecretLength = 2;
      const base: Base = 'bin';

      const secret: string = generateSecret(length, base, mockRandom);

      expect(secret).toHaveLength(2);

      // Checking for the uniqueness of the digits
      const uniqueDigits = new Set(secret.split(''));
      expect(uniqueDigits.size).toBe(2);
      expect(secret).toMatch(/^[01]+$/);
    });
  });

  describe('Валидация ограничений и краевых случаев (Edge Cases & Errors)', () => {
    it('должен выбрасывать ошибку, если запрошенная длина больше доступного количества цифр в системе счисления', () => {
      // For 'bin', a maximum of 2 unique digits ('0', '1') are available. A request for a length of 3 should fail.
      const length = 3 as SecretLength;
      const base: Base = 'bin';
      const mockRandom = Math.random;

      expect(() => generateSecret(length, base, mockRandom)).toThrow();
    });

    it('должен выбрасывать ошибку при попытке задать длину меньше 2', () => {
      const length = 1 as unknown as SecretLength;
      const base: Base = 'dec';

      expect(() => generateSecret(length, base, Math.random)).toThrow();
    });

    it('должен выбрасывать ошибку при попытке задать длину больше 6', () => {
      const length = 7 as unknown as SecretLength;
      const base: Base = 'dec';

      expect(() => generateSecret(length, base, Math.random)).toThrow();
    });

    it('должен выбрасывать ошибку для неподдерживаемой системы счисления', () => {
      const length: SecretLength = 4;
      const invalidBase = 'invalid_base' as unknown as Base;

      expect(() => generateSecret(length, invalidBase, Math.random)).toThrow();
    });
  });

  describe('Детерминированность и чистота функции', () => {
    it('должен возвращать абсолютно одинаковый результат при одинаковом источнике случайности', () => {
      // Oct alphabet: '01234567' (8 characters)
      const length: SecretLength = 4;
      const base: Base = 'oct';

      const randomGen1 = () => 0.42;
      const randomGen2 = () => 0.42;

      const result1: string = generateSecret(length, base, randomGen1);
      const result2: string = generateSecret(length, base, randomGen2);

      expect(result1).toBe(result2);
    });
  });
});
