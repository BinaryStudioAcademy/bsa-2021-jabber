
const getSortedItems = <T>(
  items: T[],
  keyToSort: keyof T,
): T[] => {
  return [...items].sort((itemA: T, itemB: T): number => itemA[keyToSort] > itemB[keyToSort] ? 1 : -1);
};

export { getSortedItems };
