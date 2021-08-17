import { PlayerRef } from 'components/common/player/player';
import { Dimensions } from '../../common/types/types';

const getCommentsTimelineDimensions = (
  playerRef: React.MutableRefObject<PlayerRef | null>,
  playerContainerRef: React.RefObject<HTMLDivElement>,
): Dimensions | null => {
  const player = playerRef.current?.getRef().current;
  const playerContainer = playerContainerRef.current;
  const progressBar = player?.progressBar.current;

  if (!player || !playerContainer || !progressBar) {
    return null;
  }

  const { x: progressBarLeft, width: progressBarWidth } =
    progressBar.getBoundingClientRect();
  const { x: playerContainerLeft, width: playerContainerWidth } =
    playerContainer.getBoundingClientRect();

  const offset = progressBarLeft - playerContainerLeft;

  const dimensions = {
    offset,
    progressBarWidth,
    playerContainerWidth,
  };

  return dimensions;
};

export { getCommentsTimelineDimensions };
