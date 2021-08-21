
const getSortedItems = <T>(
  items: T[],
  cb: (itemA: T, itemB: T) => number,
): T[] => {
  return [...items].sort(cb);
};

export { getSortedItems };
