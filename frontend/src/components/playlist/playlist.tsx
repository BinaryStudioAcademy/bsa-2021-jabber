import {
  useAppSelector,
  useDispatch,
  useParams,
  useEffect,
  useState,
} from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { DataStatus, UserRole, AppRoute } from 'common/enums/enums';
import { playlist as playlistActions } from 'store/actions';
import {
  Loader,
  ImageWrapper,
  Link,
  ConfirmPopup,
} from 'components/common/common';
import { getAllowedClasses } from 'helpers/helpers';
import { PageParams } from './common/types/types';
import { EpisodeTable } from './components/components';
import styles from './styles.module.scss';

const Playlist: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState<boolean>(false);

  const { dataStatus, user, playlist, episodes, episodesDataStatus } = useAppSelector(({ auth, playlist }: RootState) => ({
    user: auth.user,
    dataStatus: playlist.dataStatus,
    playlist: playlist.playlist,
    episodes: playlist.episodes,
    episodesDataStatus: playlist.dataStatus,
  }));
  const isLoading = dataStatus === DataStatus.PENDING;
  const isOwner = user?.id === playlist?.userId;
  const isMaster = user?.role === UserRole.MASTER;
  const isAllowDelete = isOwner || isMaster;
  const isEpisodesLoading = episodesDataStatus === DataStatus.PENDING;

  useEffect(() => {
    dispatch(playlistActions.loadById(Number(id)));
    dispatch(playlistActions.loadEpisodesByPlaylistId(Number(id)));
  }, [id]);

  const handleDeletePlaylist = (): void => {
    if (user) {
      dispatch(
        playlistActions.deletePlaylist({
          playlistId: Number(id),
          userId: user?.id,
        }),
      );
    }
  };

  const handleTogglePopup = (): void => {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
  };

  const handleDeleteEpisode = (id: number): void => {
    dispatch(playlistActions.deleteEpisodeFromPlaylist(id));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    playlist && dataStatus === DataStatus.FULFILLED ? (
      <>
        <div className={styles.infoWrapper}>
          <div className={getAllowedClasses(styles.container, styles.infoContainer)}>
            <div className={styles.playlistImage}>
              <ImageWrapper
                src={playlist?.cover?.url}
                alt={playlist?.name}
                label={playlist?.name}
                className={styles.imageWrapper}
              />
            </div>
            <div className={styles.descriptionWrapper}>
              <h1 className={styles.title}>{playlist?.name}</h1>
              <p className={styles.description}>{playlist?.description}</p>
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <div
                    className={getAllowedClasses(styles.infoName, styles.host)}
                  >
                    Author
                  </div>
                  <Link
                    className={styles.infoInner}
                    to={`${AppRoute.USERS}/${playlist.userId}`}
                  >
                    {playlist.user.nickname}
                  </Link>
                </li>
                <li className={styles.infoItem}>
                  <div
                    className={getAllowedClasses(
                      styles.infoName,
                      styles.status,
                    )}
                  >
                    Status
                  </div>
                  <p className={styles.infoInner}>{playlist.status}</p>
                </li>
              </ul>
            </div>
            <div className={styles.buttonsGroup}>
              <Link
                to={`${AppRoute.PLAYLISTS_USERS}/${user?.id}`}
                className={getAllowedClasses(styles.userPlaylistsLink, styles.playlistButton)}
              >
                <span className="visually-hidden">User playlists</span>
              </Link>
              {isOwner && (
                <Link
                  to={`${AppRoute.PLAYLISTS_EDIT}/${id}`}
                  className={getAllowedClasses(styles.editLink, styles.playlistButton)}
                >
                  <span className="visually-hidden">Edit playlist</span>
                </Link>
              )}
              {isAllowDelete && (
                <button
                  className={getAllowedClasses(styles.deleteButton, styles.playlistButton)}
                  onClick={handleTogglePopup}
                >
                  <span className="visually-hidden">Delete playlist</span>
                </button>
              )}
              <ConfirmPopup
                title="Delete Playlist"
                description="You are going to delete the playlist. Are you sure about this?"
                isOpen={isConfirmPopupOpen}
                onClose={handleTogglePopup}
                onConfirm={handleDeletePlaylist}
              />
            </div>
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <div className={styles.container}>
            {isEpisodesLoading
              ? <Loader />
              : episodes.length
                ? <EpisodeTable
                  episodes={episodes}
                  handleDeleteEpisode={handleDeleteEpisode}
                  isAllowDelete={isAllowDelete}
                />
                : (
                  <div className={styles.placeholder}>
                    There are no episodes in this playlist yet.
                  </div>
                )}
          </div>
        </div>
      </>
    ) : (
      <h1 className={styles.oopsMessage}>Oops. There&apos;s no such playlist</h1>
    )
  );
};

export default Playlist;
