import { Dimensions } from '../../../../common/types/types';

const FULL_WIDTH = 100;

const getCommentOffset = (
  duration: number,
  timestamp: number,
  dimensions: Dimensions,
): number => {
  return (
    ((dimensions.offset +
      (timestamp / duration) * dimensions.progressBarWidth) /
      dimensions.playerContainerWidth) *
    FULL_WIDTH
  );
};

export { getCommentOffset };
