import { DateFormatType } from 'common/enums/enums';
import { getFormattedDate } from 'helpers/date/date';

const formatDate = (date: Date): string => {
  return getFormattedDate(date, DateFormatType.DAY_MONTH_YEAR);
};

export { formatDate };
