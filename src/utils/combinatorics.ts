// A cache for memoizing the results of recursive computations (stored in the module's memory)
const permutationCache = new Map<string, number>();

/**
 * Recursive helper function for calculating arrangements, with memoization
 */
export const getPermutations = (length: number, alphabetSize: number): number => {
  if (length === 0) return 1;
  if (length < 0 || alphabetSize < length) return 0;

  const cacheKey = `${length}_${alphabetSize}`;

  if (permutationCache.has(cacheKey)) {
    return permutationCache.get(cacheKey)!;
  }

  // Recursive relationship: P(n, k) = n * P(n - 1, k - 1)
  const result = alphabetSize * getPermutations(length - 1, alphabetSize - 1);

  permutationCache.set(cacheKey, result);

  return result;
};
