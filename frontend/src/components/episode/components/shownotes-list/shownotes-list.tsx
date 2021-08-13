import { Shownote as TShownote } from 'common/types/types';
import Shownote from '../shownote/shownote';
import styles from './styles.module.scss';

type Props = {
  shownotes: TShownote[];
  onClick: (payload: number) => void;
};

const ShownotesList: React.FC<Props> = ({ shownotes, onClick }) => {

  return (
    <ul
      className={styles.columnsWrapper}
    >
      {shownotes.map((shownote) => (
        <Shownote
          key={shownote.id}
          shownote={shownote}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};

export default ShownotesList;
