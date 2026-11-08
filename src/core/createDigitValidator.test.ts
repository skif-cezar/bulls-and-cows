import { Base } from '../types/game.types';
import { createDigitValidator } from './createDigitValidator';

describe('createDigitValidator()', () => {
  describe('Двоичная система счисления (bin)', () => {
    const isValidBin = createDigitValidator('bin');

    it('должен возвращать true для допустимых двоичных цифр', () => {
      expect(isValidBin('0')).toBe(true);
      expect(isValidBin('1')).toBe(true);
    });

    it('должен возвращать false для цифр вне двоичного диапазона', () => {
      expect(isValidBin('2')).toBe(false);
      expect(isValidBin('9')).toBe(false);
    });
  });

  describe('Десятичная система счисления (dec)', () => {
    const isValidDec = createDigitValidator('dec');

    it('должен возвращать true для всех цифр от 0 до 9', () => {
      const validDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

      validDigits.forEach((digit) => {
        expect(isValidDec(digit)).toBe(true);
      });
    });

    it('должен возвращать false для букв и спецсимволов', () => {
      expect(isValidDec('a')).toBe(false);
      expect(isValidDec('-')).toBe(false);
      expect(isValidDec('')).toBe(false);
    });
  });

  describe('Шестнадцатеричная система счисления (hex) и регистронезависимость', () => {
    const isValidHex = createDigitValidator('hex');

    it('должен возвращать true для шестнадцатеричных цифр в нижнем регистре', () => {
      expect(isValidHex('0')).toBe(true);
      expect(isValidHex('9')).toBe(true);
      expect(isValidHex('a')).toBe(true);
      expect(isValidHex('f')).toBe(true);
    });

    it('должен возвращать true для шестнадцатеричных цифр в верхнем регистре (регистронезависимость)', () => {
      expect(isValidHex('A')).toBe(true);
      expect(isValidHex('F')).toBe(true);
      expect(isValidHex('B')).toBe(true);
    });

    it('должен возвращать false для символов за пределами алфавита hex', () => {
      expect(isValidHex('g')).toBe(false);
      expect(isValidHex('G')).toBe(false);
      expect(isValidHex('z')).toBe(false);
    });
  });

  describe('Краевые случаи', () => {
    it('должен возвращать false для строк длиной более одного символа', () => {
      const isValidDec = createDigitValidator('dec');

      expect(isValidDec('12')).toBe(false);
    });

    it('должен возвращать false для некорректной/неподдерживаемой системы счисления', () => {
      const invalidValidator = createDigitValidator('invalid_base' as unknown as Base);

      expect(invalidValidator('5')).toBe(false);
    });
  });
});
