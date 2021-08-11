import { Shownote as TShownote } from 'common/types/types';
import { getTimeFormatHHMMSS } from '../../helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  shownotes: TShownote[];
  handleJumpToTimeLine: (payload: number) => void;
};

const Shownotes: React.FC<Props> = ({ shownotes, handleJumpToTimeLine }) => {

  return (
    <ul className={styles.list}>
      {shownotes.map((shownote) => (
        <li
          key={shownote.id}
          className={styles.rowWrapper}
          onClick={(): void => handleJumpToTimeLine(shownote.timestamp)}
        >
          <span className={styles.time}>
            {getTimeFormatHHMMSS(shownote.timestamp)}
          </span>
          &nbsp;
          <span className={styles.noteName}>
            {shownote.name}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Shownotes;
