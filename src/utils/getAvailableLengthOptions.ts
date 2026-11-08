import { SelectOption } from '../types/ui.types';

const RADIX_LIMITS: Record<string, number> = {
  bin: 2,
  oct: 8,
  dec: 10,
  hex: 16,
};

/**
 * Returns an array of lengths for the selected numeral system
 */
export const getAvailableLengthOptions = (selectedNotation: string, allLengths: SelectOption[]): SelectOption[] => {
  const maxLimit = RADIX_LIMITS[selectedNotation] ?? 10;

  return allLengths.filter((option) => {
    const lengthNumber = parseInt(option.value, 10);
    return lengthNumber <= maxLimit;
  });
};
