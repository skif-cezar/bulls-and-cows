import { RecordItem } from '../types/game.types';

const STORAGE_KEY = 'bulls_and_cows_records';
const MAX_RECORDS = 10;

/** Generating a unique ID */
const createId = (): string =>
  typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9);

/**
 * A validator for checking the structural integrity of a record element (protection against junk data in localStorage)
 */
const isValidRecord = (item: unknown): item is RecordItem => {
  if (typeof item !== 'object' || item === null) return false;
  const record = item as RecordItem;

  return (
    typeof record.id === 'string' &&
    typeof record.attempts === 'number' &&
    typeof record.time === 'number' &&
    typeof record.base === 'string' &&
    typeof record.length === 'number' &&
    typeof record.date === 'string'
  );
};

/**
 * Adds a new element, sorts, and trims the array to the top-N
 */
export const insertAndSortRecord = (
  records: RecordItem[],
  newRecord: Omit<RecordItem, 'id' | 'date'>,
  generateId: () => string = createId,
): RecordItem[] => {
  const recordItem: RecordItem = {
    ...newRecord,
    id: generateId(),
    date: new Date().toLocaleDateString(),
  };

  return [...records, recordItem]
    .sort((a, b) => {
      if (a.attempts !== b.attempts) {
        return a.attempts - b.attempts;
      }
      return a.time - b.time;
    })
    .slice(0, MAX_RECORDS);
};

/**
 * Reading records from localStorage with data validity checks
 */
export const getRecords = (): RecordItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isValidRecord);
  } catch (error) {
    console.error('Failed to load or parse records from localStorage', error);
    return [];
  }
};

/**
 * Adding a new record and saving it to localStorage
 */
export const addRecord = (newRecord: Omit<RecordItem, 'id' | 'date'>): RecordItem[] => {
  const currentRecords = getRecords();
  const topRecords = insertAndSortRecord(currentRecords, newRecord);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(topRecords));
  } catch (error) {
    console.error('Failed to save records to localStorage', error);
  }

  return topRecords;
};
