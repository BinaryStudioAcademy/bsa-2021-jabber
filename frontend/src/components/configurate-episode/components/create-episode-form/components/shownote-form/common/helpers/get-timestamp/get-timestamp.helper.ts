import { SECONDS_IN_MINUTE } from 'common/constants/constants';

const getTimestamp = (minutes: number, seconds: number): number => {
  return minutes * SECONDS_IN_MINUTE + seconds;
};

export { getTimestamp };
