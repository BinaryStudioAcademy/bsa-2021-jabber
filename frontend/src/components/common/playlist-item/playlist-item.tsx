import { AppRoute } from 'common/enums/enums';
import { Playlist } from 'common/types/types';
import { Link, ImageWrapper } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  playlist: Playlist;
};

const PlaylistItem: React.FC<Props> = ({ playlist }) => (
  <li>
    <div className={styles.wrapper}>
      <Link to={`${AppRoute.PLAYLISTS}/${playlist.id}`} className={styles.imgLink}>
        <ImageWrapper
          width="100"
          height="100"
          loading="lazy"
          src={playlist.cover?.url}
          alt={playlist.name}
          label={playlist.name}
          className={styles.imageWrapper}
        />
      </Link>
      <div className={styles.linksWrapper}>
        <Link to={`${AppRoute.PLAYLISTS}/${playlist.id}`} className={styles.link}>
          {playlist.name}
        </Link>
        <Link
          to={`${AppRoute.USERS}/${playlist.user.id}`}
          className={styles.linkUser}
        >
          {playlist.user.nickname}
        </Link>
      </div>
    </div>
  </li>
);

export default PlaylistItem;
