import { Shownote as TShownote } from 'common/types/types';
import { DateFormatType } from 'common/enums/enums';
import { MILLISECONDS_IN_SECOND } from '../../../common/player/common/constants';
import styles from './styles.module.scss';
import { getFormattedDate } from 'helpers/date/date';

type Props = {
  shownote: TShownote;
  handleJumpToTimeLine: (payload: number) => void;
};

const Shownote: React.FC<Props> = ({ shownote, handleJumpToTimeLine }) => {
  const timeZoneOffsetInMS = new Date().getTimezoneOffset() * 60 * MILLISECONDS_IN_SECOND;
  const offset = new Date(shownote.timestamp * 1000 + timeZoneOffsetInMS);
  const time = getFormattedDate(offset, DateFormatType.HOURS_MINUTES_SECONDS);

  const onTimeLineJump = (): void => {
    handleJumpToTimeLine(shownote.timestamp);
  };

  return (
    <button
      className={styles.rowWrapper}
      onClick={onTimeLineJump}
    >
      <span className={styles.time}>
        {time}
      </span>
      &nbsp;
      <span className={styles.noteName}>
        {shownote.name}
      </span>
    </button>
  );
};

export default Shownote;
