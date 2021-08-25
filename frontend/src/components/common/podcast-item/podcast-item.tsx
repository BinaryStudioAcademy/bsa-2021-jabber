import { AppRoute } from 'common/enums/enums';
import { Podcast as TPodcast } from 'common/types/types';
import { Link, ImageWrapper } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  podcast: TPodcast;
};

const PodcastItem: React.FC<Props> = ({ podcast }) => (
  <li>
    <div className={styles.wrapper}>
      <ImageWrapper
        width="225"
        height="225"
        loading="lazy"
        src={podcast.image?.url}
        alt={podcast.name}
        label={podcast.name}
        className={styles.imageWrapper}
      />
      <h3 className={styles.title}>
        <Link to={`${AppRoute.PODCASTS}/${podcast.id}`} className={styles.link}>
          {podcast.name}
        </Link>
      </h3>
    </div>
    <Link
      to={`${AppRoute.USERS}/${podcast.user.id}`}
      className={styles.linkUser}
    >
      {podcast.user.nickname}
    </Link>
  </li>
);

export default PodcastItem;
