import { getRandomNumber } from '~/helpers/number/number';

const RANDOM_ITEM_START_IDX = 0;
const RANDOM_ITEM_DECREMENT = 1;

const getRandomItem = <T>(items: T[]): T => {
  const randomIdx = getRandomNumber(
    RANDOM_ITEM_START_IDX,
    items.length - RANDOM_ITEM_DECREMENT,
  );

  const randomItem = items[randomIdx];

  return randomItem;
};

export { getRandomItem };
