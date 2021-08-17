import { Podcast as TPodcast } from 'common/types/types';
import { PodcastItem } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  podcasts: TPodcast[];
};

const PodcastsList: React.FC<Props> = ({ podcasts }) => {
  return (
    <ul className={styles.list}>
      {podcasts.map((it) => {
        return <PodcastItem podcast={it} key={it.id} />;
      })}
    </ul>
  );
};

export default PodcastsList;
