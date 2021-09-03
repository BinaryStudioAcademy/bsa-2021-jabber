import { Playlist } from 'common/types/types';
import styles from './styles.module.scss';

type Props = {
  playlist: Playlist;
  onAddToPlaylist: (id: number) => void;
};

const PopupItem: React.FC<Props> = ({ playlist, onAddToPlaylist }) => {
  const { id, name } = playlist;

  const handleAddToPlaylist = (): void => {
    onAddToPlaylist(id);
  };

  return (
    <li
      className={styles.list}>
      <button
        className={styles.listButton}
        onClick={handleAddToPlaylist}
      >
        {name}
      </button>
    </li>
  );
};

export default PopupItem;
