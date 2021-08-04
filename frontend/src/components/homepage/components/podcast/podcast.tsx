import { AppRoute } from 'common/enums/enums';
import { Podcast as TPodcast } from 'common/types/types';
import { Link } from 'components/common/common';
import styles from './styles.module.scss';

const DEFAULT_PODCAST_IMG = 'https://russiancast.club/covers/teapaladin@2x.webp';

type Props = {
  podcast: TPodcast;
};

const Podcast: React.FC<Props> = ({ podcast }) => (
  <li className={styles.wrapper}>
    <p className={styles.imageWrapper}>
      <img src={DEFAULT_PODCAST_IMG} width="195" height="195" loading="lazy" />
    </p>
    <h3 className={styles.title}>
      <Link to={`${AppRoute.PODCASTS}/${podcast.id}`} className={styles.link}>{podcast.name}</Link>
    </h3>
  </li>
);

export default Podcast;
