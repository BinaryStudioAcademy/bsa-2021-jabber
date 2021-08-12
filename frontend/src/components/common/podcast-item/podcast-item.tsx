import { AppRoute } from 'common/enums/enums';
import { Podcast as TPodcast } from 'common/types/types';
import { Link, DefaultImage } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  podcast: TPodcast;
};

const Podcast: React.FC<Props> = ({ podcast }) => (
  <li className={styles.wrapper}>
    <div className={styles.imageWrapper}>
      {podcast.image ? (
        <img
          src={podcast.image.url}
          className={styles.podcastImage}
          width="195"
          height="195"
          loading="lazy"
        />
      ) : (
        <DefaultImage label={podcast.name} />
      )}
    </div>
    <h3 className={styles.title}>
      <Link to={`${AppRoute.PODCASTS}/${podcast.id}`} className={styles.link}>
        {podcast.name}
      </Link>
    </h3>
  </li>
);

export default Podcast;
