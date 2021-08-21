
const getSortedItems = <T>(
  items: T[],
  cb: (itemA: T, itemB: T) => number,
): T[] => {
  return items.slice().sort(cb);
};

export { getSortedItems };
