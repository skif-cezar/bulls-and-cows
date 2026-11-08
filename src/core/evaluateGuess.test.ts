import { EvaluationResult } from '../types/game.types';
import { evaluateGuess } from './evaluateGuess';

describe('evaluateGuess()', () => {
  it('должен возвращать 0 быков (цифра, которая угадана верно и стоит на своем месте) и 0 коров (цифра, которая присутствует в секретном числе, но стоит на неправильном месте), если нет совпадений', () => {
    const secret: string = '1234';
    const guess: string = '5678';

    const result: EvaluationResult = evaluateGuess(secret, guess);

    expect(result).toEqual({ bulls: 0, cows: 0 });
  });

  it('должен возвращать максимальное количество быков при точном совпадении (все цифры на своих местах)', () => {
    const secret: string = '1234';
    const guess: string = '1234';

    const result: EvaluationResult = evaluateGuess(secret, guess);

    expect(result).toEqual({ bulls: 4, cows: 0 });
  });

  it('должен корректно считать комбинацию быков и коров', () => {
    const secret: string = '1234';
    const guess: string = '1325';

    const result: EvaluationResult = evaluateGuess(secret, guess);

    expect(result).toEqual({ bulls: 1, cows: 2 });
  });

  it('должен возвращать только коров, если все цифры угаданы, но стоят на неверных позициях', () => {
    const secret: string = '1234';
    const guess: string = '4321';

    const result: EvaluationResult = evaluateGuess(secret, guess);

    expect(result).toEqual({ bulls: 0, cows: 4 });
  });

  describe('Валидация и краевые случаи', () => {
    it('должен выбрасывать ошибку, если длина попытки не совпадает с длиной секрета', () => {
      const secret: string = '1234';
      const guess: string = '123';

      expect(() => evaluateGuess(secret, guess)).toThrow();
    });
  });
});
