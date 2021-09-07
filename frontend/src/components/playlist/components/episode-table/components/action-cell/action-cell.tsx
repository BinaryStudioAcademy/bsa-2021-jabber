import styles from './styles.module.scss';
import { EpisodeNameRow } from '../../types/episode-name-row.type';

type Props = {
  value: EpisodeNameRow;
  onDeleteEpisode: (id: number) => void;
};

const ActionCell: React.FC<Props> = ({ value, onDeleteEpisode }) => {

  const handleDeleteEpisode = (): void => {
    onDeleteEpisode(Number(value.episodeId));
  };

  return (
    <button
      onClick={handleDeleteEpisode}
      className={styles.button}
    >
      <span className="visually-hidden">Delete episode</span>
    </button>
  );
};

export default ActionCell;
