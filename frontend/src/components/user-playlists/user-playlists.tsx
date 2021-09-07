import { useEffect } from 'react';
import {
  userPlaylists as userPlaylistsActions,
} from 'store/actions';
import { useAppSelector, useDispatch, useParams } from 'hooks/hooks';
import { Loader, PlaylistsList } from 'components/common/common';
import { RootState } from 'common/types/types';
import { PageParams } from 'components/configurate-podcast/common/types/page-params.type';
import { DataStatus } from 'common/enums/enums';
import { checkIsOneOf } from 'helpers/helpers';
import styles from './styles.module.scss';

const UserPlaylist: React.FC = () => {
  const {
    playlistsDataStatus,
    userDataStatus,
    playlists,
    user,
  } = useAppSelector(({ userPlaylists }: RootState) => ({
    playlistsDataStatus: userPlaylists.playlistsDataStatus,
    userDataStatus: userPlaylists.userDataStatus,
    playlists: userPlaylists.playlists,
    user: userPlaylists.user,
  }));
  const { id } = useParams<PageParams>();
  const dispatch = useDispatch();

  const hasPlaylists = Boolean(playlists.length);
  const isLoading = checkIsOneOf(DataStatus.PENDING, playlistsDataStatus, userDataStatus);

  useEffect(() => {
    dispatch(userPlaylistsActions.loadPlaylistsOwner(Number(id)));
    dispatch(userPlaylistsActions.loadPlaylists(Number(id)));
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
