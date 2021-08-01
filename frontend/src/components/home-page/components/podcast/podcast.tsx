import styles from './styles.module.scss';
import { Podcast as TPodcast } from 'common/types/types';

type Props = {
  podcast: TPodcast;
};

const Podcast: React.FC<Props> = ({
  podcast,
}) => (
  <li className={styles.podcast}>
    <div className={styles.imageBlock}>
      <div className={styles.layer}> </div>
      <img src="" loading="lazy"/>
    </div>
    <div className={styles.descriptionBlock}>
      <div className={styles.albumTitle}>
        <span>{ podcast.name } </span>
      </div>
    </div>
  </li>
);

export default Podcast;
