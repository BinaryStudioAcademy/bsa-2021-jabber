import { getRandomItem } from 'helpers/helpers';
import { RainbowColor } from 'common/enums/enums';

const colors = Object.values(RainbowColor);

const getCommentColor = (): string => {
  return getRandomItem(colors);
};

export { getCommentColor };
