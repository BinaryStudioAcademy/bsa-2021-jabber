import { intervalToDuration } from 'date-fns';

const mapSecondToCommentTime = (intervalInSeconds: number): string => {
  const normalizeTime = (timeNumber: number | undefined): string => {
    if (timeNumber) {
      const time = timeNumber.toString();
      return time.length === 1 ? `0${time}` : time;
    }
    return '00';
  };

  const helperDate = intervalToDuration({ start: 0, end: intervalInSeconds * 1000 });

  const hours = normalizeTime(helperDate.hours);
  const minutes = normalizeTime(helperDate.minutes);
  const seconds =  normalizeTime(helperDate.seconds);

  return `${hours}:${minutes}:${seconds}`;
};

export { mapSecondToCommentTime };
