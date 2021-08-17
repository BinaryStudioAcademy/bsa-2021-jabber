import { DateFormatType } from 'common/enums/enums';
import { MILLISECONDS_IN_SECOND, SECONDS_IN_MINUTE } from 'common/constants/constants';
import { getFormattedDate } from 'helpers/date/date';

const getTimeOffset = (seconds: number): string => {
  const timeZoneOffsetInMinutes = new Date().getTimezoneOffset();
  const timeZoneOffsetInMS = timeZoneOffsetInMinutes * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
  const offset = new Date(seconds * MILLISECONDS_IN_SECOND + timeZoneOffsetInMS);

  return getFormattedDate(offset, DateFormatType.HOURS_MINUTES_SECONDS);
};

export { getTimeOffset };
