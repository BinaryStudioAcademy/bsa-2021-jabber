import { PlayerRef } from 'components/common/player/player';

const DEFAULT_TIME = 0;

const getCurrentTime = (playerRef: React.MutableRefObject<PlayerRef | null>): number => {

  return playerRef.current
    ? Math.round(playerRef.current?.getCurrentTime())
    : DEFAULT_TIME;
};

export { getCurrentTime };
