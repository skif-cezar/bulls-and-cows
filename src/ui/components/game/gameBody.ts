export const createGameBody = (): HTMLElement => {
  const gameBody = document.createElement('div');
  gameBody.classList.add('game-body');

  const sectionHistory = document.createElement('section');
  sectionHistory.classList.add('game-section', 'history');

  const sectionHistoryTitle = document.createElement('h3');
  sectionHistoryTitle.classList.add('game-section-title', 'history-title');
  sectionHistoryTitle.textContent = `A History of Attempts (${2})`;

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

  return gameBody;
};
