import { Podcast as TPodcast } from 'common/types/types';
import Podcast from '../podcast/podcast';
import styles from './styles.module.scss';

type Props = {
  podcasts: TPodcast[];
};

const PodcastsList: React.FC<Props> = ({ podcasts }) => {
  const hasPodcasts = Boolean(podcasts.length);

  return (
    <ul className={styles.list}>
      {hasPodcasts ? podcasts.map((it) => (
        <Podcast podcast={it} key={it.id}/>
      )) :
        <span className={styles.oopsMessage}> Oops! There&apos;s nothing here </span>}
    </ul>
  );
};

export default PodcastsList;
