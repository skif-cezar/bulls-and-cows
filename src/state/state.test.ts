import { GameState, HistoryEntry } from '../types/game.types';
import { addAttemptToState } from './state';

describe('State Management: addAttemptToState()', () => {
  const initialState: GameState = {
    secret: '1234',
    history: [],
    settings: { length: 4, base: 'dec' },
    status: 'playing',
    elapsedSeconds: 0,
  };

  it('должен добавлять новую попытку в историю, создавая новый массив и новый объект состояния', () => {
    const entry: HistoryEntry = { guess: '1234', bulls: 1, cows: 2 };

    const nextState = addAttemptToState(initialState, entry);

    expect(nextState.history).toHaveLength(1);
    expect(nextState.history[0]).toEqual(entry);

    expect(nextState).not.toBe(initialState);
    expect(nextState.history).not.toBe(initialState.history);

    expect(initialState.history).toHaveLength(0);
  });

  it('должен сохранять старые записи в истории неизменными и добавлять новую в конец', () => {
    const firstEntry: HistoryEntry = { guess: '1234', bulls: 0, cows: 0 };
    const secondEntry: HistoryEntry = { guess: '5678', bulls: 2, cows: 0 };

    const stateWithOneAttempt = addAttemptToState(initialState, firstEntry);
    const nextState = addAttemptToState(stateWithOneAttempt, secondEntry);

    expect(nextState.history).toHaveLength(2);
    expect(nextState.history[0]).toEqual(firstEntry);
    expect(nextState.history[1]).toEqual(secondEntry);

    expect(nextState.history[0]).toBe(stateWithOneAttempt.history[0]);
  });

  it('должен сохранять остальные поля состояния (secret, settings, status) без изменений', () => {
    const entry: HistoryEntry = { guess: '4321', bulls: 4, cows: 0 };

    const nextState = addAttemptToState(initialState, entry);

    expect(nextState.secret).toBe(initialState.secret);
    expect(nextState.settings).toEqual(initialState.settings);
    expect(nextState.status).toBe(initialState.status);
  });
});
