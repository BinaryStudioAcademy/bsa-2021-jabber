import { PlayerRef } from 'components/common/player/player';

const getCurrentTime = (playerRef: React.MutableRefObject<PlayerRef | null>): number => {
  return playerRef.current
    ? Math.round(playerRef.current?.getCurrentTime())
    : 0;
};

export { getCurrentTime };
