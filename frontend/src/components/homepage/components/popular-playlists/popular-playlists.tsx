import { Playlist } from 'common/types/types';
import { PlaylistItem } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  popularPlaylists: Playlist[];
};

const PopularPlaylists: React.FC<Props> = ({ popularPlaylists }: Props) => {
  const hasPopularPlaylists = Boolean(popularPlaylists.length);
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Popular playlists</h2>
      {hasPopularPlaylists ? (
        <ul
          className={styles.playlistsRow}
        >
          {popularPlaylists.map((playlist) => (
            <PlaylistItem key={playlist.id} playlist={playlist} />
          ))}
        </ul>
      ) : (
        <span className={styles.oopsMessage}>
          Oops! There&apos;s nothing here
        </span>
      )}
    </div>
  );
};

export default PopularPlaylists;
