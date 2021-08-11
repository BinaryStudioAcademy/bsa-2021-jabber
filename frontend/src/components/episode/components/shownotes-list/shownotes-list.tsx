import { Shownote as TShownote } from 'common/types/types';
import Shownotes from '../shownotes/shownotes';
import styles from './styles.module.scss';

type Props = {
  shownotes: TShownote[];
  handleJumpToTimeLine: (payload: number) => void;
};

const ShownotesList: React.FC<Props> = ({ shownotes, handleJumpToTimeLine }) => {
  const halfOfShownotes = shownotes.length / 2;
  const notesOnLeftSide = [];
  const notesOnRightSide = [];

  for (let i = 0; i < shownotes.length; i++) {
    i < halfOfShownotes ? notesOnLeftSide.push(shownotes[i]) : notesOnRightSide.push(shownotes[i]);
  }

  return (
    <div className={styles.columnsWrapper}>
      {notesOnLeftSide && (
        <Shownotes
          shownotes={notesOnLeftSide}
          handleJumpToTimeLine={handleJumpToTimeLine}
        />
      )}
      {notesOnRightSide && (
        <Shownotes
          shownotes={notesOnRightSide}
          handleJumpToTimeLine={handleJumpToTimeLine}
        />
      )}
    </div>
  );
};

export default ShownotesList;
