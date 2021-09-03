import { useEffect } from 'react';
import {
  playlist as playlistActions,
} from 'store/actions';
import { useAppSelector, useDispatch, useParams } from 'hooks/hooks';
import { Loader, PlaylistsList } from 'components/common/common';
import { RootState } from 'common/types/types';
import { PageParams } from 'components/configurate-podcast/common/types/page-params.type';
import { DataStatus } from 'common/enums/enums';
import styles from './styles.module.scss';

const UserPlaylist: React.FC = () => {
  const {
    dataStatus,
    playlists,
    user,
  } = useAppSelector(({ playlist }: RootState) => ({
    dataStatus: playlist.dataStatus,
    playlists: playlist.playlists,
    user: playlist.user,
  }));
  const { id } = useParams<PageParams>();
  const dispatch = useDispatch();

  const hasPlaylists = Boolean(playlists.length);
  const isLoading = dataStatus === DataStatus.PENDING;

  useEffect(() => {
    dispatch(playlistActions.loadPlaylistsOwner(Number(id)));
    dispatch(playlistActions.loadPlaylists(Number(id)));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>{user?.nickname} Playlists:</h2>
      {hasPlaylists ? (
        <PlaylistsList
          playlists={playlists}
        />
      ) : (
        <span className={styles.oopsMessage}>
          Oops! There&apos;s nothing here
        </span>
      )}
    </main>
  );
};

export default UserPlaylist;
