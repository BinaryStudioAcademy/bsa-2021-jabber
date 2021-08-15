import moment from 'moment';

const mapSecondToCommentTime = (seconds: number): string => {
  return moment.utc(seconds * 1000).format('HH:mm:ss');
};

export { mapSecondToCommentTime };
