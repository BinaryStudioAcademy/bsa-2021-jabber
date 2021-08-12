import { Shownote as TShownote } from 'common/types/types';
import Shownote from '../shownote/shownote';
import styles from './styles.module.scss';

type gridStyle = {
  gridTemplateColumns: string;
  gridTemplateRows: string;
};

const getGridMarkup = (shownotes: TShownote[]): gridStyle => {
  const halfOfShownotes = Math.ceil(shownotes.length / 2);
  let columnsCount = 1;
  let rowsCount = shownotes.length;
  if (halfOfShownotes >= 4) {
    columnsCount = 2;
    rowsCount = halfOfShownotes;
  }
  return {
    gridTemplateColumns: `repeat(${columnsCount}, 6fr)`,
    gridTemplateRows: `repeat(${rowsCount}, 1fr)`,
  };
};

type Props = {
  shownotes: TShownote[];
  handleJumpToTimeLine: (payload: number) => void;
};

const ShownotesList: React.FC<Props> = ({ shownotes, handleJumpToTimeLine }) => {

  return (
    <div
      style={getGridMarkup(shownotes)}
      className={styles.columnsWrapper}
    >
      {shownotes.map((shownote) => (
        <Shownote
          key={shownote.id}
          shownote={shownote}
          handleJumpToTimeLine={handleJumpToTimeLine}
        />
      ))}
    </div>
  );
};

export default ShownotesList;
