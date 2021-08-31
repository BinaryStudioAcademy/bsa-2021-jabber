import { DateFormatType } from 'common/enums/enums';
import { getFormattedDate as getFormattedDateHelper } from 'helpers/date/date';

const getFormattedDate = (date: Date): string => {
  return getFormattedDateHelper(date, DateFormatType.DAY_MONTH_YEAR);
};

export { getFormattedDate };
