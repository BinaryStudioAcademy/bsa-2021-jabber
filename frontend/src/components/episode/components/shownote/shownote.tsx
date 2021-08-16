import { Shownote as TShownote } from 'common/types/types';
import { getTimeOffset } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  shownote: TShownote;
  onClick: (payload: number) => void;
};

const Shownote: React.FC<Props> = ({ shownote, onClick }) => {

  const time = getTimeOffset(shownote.timestamp);

  const handleTimeLineJump = (): void => {
    onClick(shownote.timestamp);
  };

  return (
    <li>
      <button
        className={styles.rowWrapper}
        onClick={handleTimeLineJump}
      >
        <span className={styles.time}>
          {time}
        </span>
          &nbsp;
        <span className={styles.noteName}>
          {shownote.name}
        </span>
      </button>
    </li>
  );
};

export default Shownote;
