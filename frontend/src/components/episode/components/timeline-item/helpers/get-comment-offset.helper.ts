import { Dimensions } from '../../../common/types/types';

const getCommentOffset = (
  duration: number,
  timestamp: number,
  dimensions: Dimensions,
): number => {
  return (
    ((dimensions.offset +
      (timestamp / duration) * dimensions.progressBarWidth) /
      dimensions.playerContainerWidth) *
    100
  );
};

export { getCommentOffset };
