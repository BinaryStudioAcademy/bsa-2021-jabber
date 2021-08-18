import { getFormattedDate } from 'helpers/helpers';
import { FileExtension, DateFormatType } from 'common/enums/enums';

const getLiveRecordName = (): string => {
  const date = getFormattedDate(
    new Date(),
    DateFormatType.DAY_MONTH_YEAR,
  ).replace(/\//g, '-');

  return `stream-record-${date}.${FileExtension.WAV}`;
};

export { getLiveRecordName };
