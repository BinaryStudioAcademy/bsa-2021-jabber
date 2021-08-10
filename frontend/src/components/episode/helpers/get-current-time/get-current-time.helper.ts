import { PlayerRef } from 'components/common/player/player';

const getCurrentTime = (playerRef: React.MutableRefObject<PlayerRef | null>): number => {
  const DEFAULT_TIME = 0;

  return playerRef.current
    ? Math.round(playerRef.current?.getCurrentTime())
    : DEFAULT_TIME;
};

export { getCurrentTime };
