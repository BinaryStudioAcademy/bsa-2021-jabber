import { Podcast as TPodcast } from 'common/types/types';
import Podcast from '../podcast/podcast';
import styles from './styles.module.scss';

type Props = {
  podcasts: TPodcast[];
};

const PodcastsList: React.FC<Props> = ({ podcasts }) => {

  return (
    <ul className={styles.list}>
      {podcasts.map((it) => (
        <Podcast podcast={it} key={it.id} />
      ))}
    </ul>
  );
};

export default PodcastsList;
