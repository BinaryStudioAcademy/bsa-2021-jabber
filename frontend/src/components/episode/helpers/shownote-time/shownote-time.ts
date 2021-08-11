import { MILLISECONDS_IN_SECOND } from '../../../common/player/common/constants';

const getTimeFormatHHMMSS = (seconds: number): string => {
  return new Date(seconds * MILLISECONDS_IN_SECOND).toISOString().substr(11, 8);
};

export { getTimeFormatHHMMSS };
