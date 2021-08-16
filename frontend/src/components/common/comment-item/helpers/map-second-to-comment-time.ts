import { addSeconds, format } from 'date-fns';

const mapSecondToCommentTime = (seconds: number): string => {
  const helperDate = addSeconds(new Date(0), seconds);
  return format(helperDate, 'mm:ss');
};

export { mapSecondToCommentTime };
