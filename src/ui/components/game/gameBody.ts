import { HistoryEntry, RecordItem } from '../../../types/game.types';
import { GameBodyComponent } from '../../../types/ui.types';

export const createGameBody = (): GameBodyComponent => {
  const gameBody = document.createElement('div');
  gameBody.classList.add('game-body');

  const sectionHistory = document.createElement('section');
  sectionHistory.classList.add('game-section', 'history');

  const sectionHistoryTitle = document.createElement('h3');
  sectionHistoryTitle.classList.add('game-section-title', 'history-title');
  sectionHistoryTitle.textContent = 'A History of Attempts (0)';

  const historyList = document.createElement('ol');
  historyList.classList.add('history-list');

  const sectionRecords = document.createElement('section');
  sectionRecords.classList.add('game-section', 'records');

  const sectionRecordsTitle = document.createElement('h3');
  sectionRecordsTitle.classList.add('game-section-title', 'records-title');
  sectionRecordsTitle.textContent = 'Top records';

  const recordsList = document.createElement('ol');
  recordsList.classList.add('records-list');

  sectionHistory.append(sectionHistoryTitle, historyList);
  sectionRecords.append(sectionRecordsTitle, recordsList);
  gameBody.append(sectionHistory, sectionRecords);

  // A method for updating the history list and the counter in the header
  const updateHistory = (history: HistoryEntry[]): void => {
    sectionHistoryTitle.textContent = `A History of Attempts (${history.length})`;
    historyList.replaceChildren();

    history.forEach((entry) => {
      const listItem = document.createElement('li');
      listItem.classList.add('history-item');

      const guessNumber = document.createElement('span');
      guessNumber.classList.add('guess-number');
      guessNumber.textContent = `${entry.guess}`;

      const guessResult = document.createElement('div');
      guessResult.classList.add('guess-result');

      const bulls = document.createElement('span');
      bulls.classList.add('item-bulls');
      bulls.textContent = `${entry.bulls}`;

      const cows = document.createElement('span');
      cows.classList.add('item-cows');
      cows.textContent = `${entry.cows}`;

      guessResult.append(bulls, cows);
      listItem.append(guessNumber, guessResult);
      historyList.append(listItem);
    });
  };

  // A method for updating records list
  const updateRecords = (records: RecordItem[]): void => {
    recordsList.replaceChildren();

    if (records.length === 0) {
      const emptyItem = document.createElement('li');
      emptyItem.classList.add('records-empty');
      emptyItem.textContent = 'No records yet';
      recordsList.append(emptyItem);
      return;
    }

    records.forEach((rec) => {
      const recordsItem = document.createElement('li');
      recordsItem.classList.add('records-item');

      const attempts = document.createElement('span');
      attempts.classList.add('records-attempts');
      attempts.textContent = 'Att: ';

      const attemptsCount = document.createElement('strong');
      attemptsCount.classList.add('records-attempts-count');
      attemptsCount.textContent = `${rec.attempts}`;

      const time = document.createElement('span');
      time.classList.add('records-time');
      time.textContent = `${rec.time} sec`;

      const badge = document.createElement('span');
      badge.classList.add('records-badge');
      badge.textContent = `${rec.base.toUpperCase()} (${rec.length})`;

      attempts.append(attemptsCount);
      recordsItem.append(attempts, time, badge);
      recordsList.append(recordsItem);
    });
  };

  return {
    element: gameBody,
    updateHistory,
    updateRecords,
  };
};
