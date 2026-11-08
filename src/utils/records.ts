import { RecordItem } from '../types/game.types';

const STORAGE_KEY = 'bulls_and_cows_records';
const MAX_RECORDS = 10;

export const getRecords = (): RecordItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load records from localStorage', error);
    return [];
  }
};

export const addRecord = (newRecord: Omit<RecordItem, 'id' | 'date'>): RecordItem[] => {
  const records = getRecords();

  const recordItem: RecordItem = {
    ...newRecord,
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
    date: new Date().toLocaleDateString(),
  };

  records.push(recordItem);

  records.sort((a, b) => {
    if (a.attempts !== b.attempts) {
      return a.attempts - b.attempts;
    }
    return a.time - b.time;
  });

  const topRecords = records.slice(0, MAX_RECORDS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(topRecords));
  } catch (error) {
    console.error('Failed to save records to localStorage', error);
  }

  return topRecords;
};
