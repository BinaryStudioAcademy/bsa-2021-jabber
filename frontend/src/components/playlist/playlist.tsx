import {
  useAppSelector,
  useDispatch,
  useParams,
  useState,
  useEffect,
} from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { DataStatus, UserRole } from 'common/enums/enums';
import { playlist as playlistActions } from 'store/actions';
import {
  Loader,
  ImageWrapper,
  Link,
} from 'components/common/common';
import { DEFAULT_EPISODE_PAGINATION } from './common/constants/constants';
import { getAllowedClasses, getFilterEpisode } from 'helpers/helpers';
import { PageParams } from './common/types/types';
import { EpisodeTable } from './components/components';
import styles from './styles.module.scss';

const Playlist: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();

  const { dataStatus, user, playlist, episodes } = useAppSelector(({ auth, playlist }: RootState) => ({
    user: auth.user,
    dataStatus: playlist.dataStatus,
    playlist: playlist.playlist,
    episodes: playlist.episodes,
  }));

  // eslint-disable-next-line no-console
  console.log('episodes', episodes);

  useEffect( () => {
    dispatch(playlistActions.loadById(Number(id)));
    dispatch(playlistActions.loadEpisodesByPlaylistId({
      playlistId: Number(id),
      filter: getFilterEpisode(episodePagination.page, episodePagination.row),
    }));
  }, [id]);

  const isLoading = dataStatus === DataStatus.PENDING;
  // const hasUser = Boolean(user);
  const isOwner = user?.id === playlist?.userId;
  const isMaster = user?.role === UserRole.MASTER;
  const isAllowDelete = isOwner || isMaster;

  const [episodePagination, setEpisodePagination] = useState(DEFAULT_EPISODE_PAGINATION);
  const countEpisodes = playlist?.episodes.length || 0;
  const totalPagesCount = Math.ceil(countEpisodes / episodePagination.row);

  if (isLoading) {
    return <Loader />;
  }

  const handlePageChange = (selectedPage: number): void => {
    setEpisodePagination({
      page: selectedPage,
      row: episodePagination.row,
    });
  };

  return (
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
          </div>
          {isOwner && (
            <Link
              to={'/'}
              className={styles.editLink}
            >
              <span className="visually-hidden">Edit playlist</span>
            </Link>
          )}
          {isAllowDelete && (
            <button
              className={styles.deleteButton}
            >
              <span className="visually-hidden">Delete playlist</span>
            </button>
          )}
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <div className={styles.container}>
          {playlist?.episodes.length
            ? <EpisodeTable
              episodes={playlist?.episodes}
              pageCount={totalPagesCount}
              currentPage={episodePagination.page}
              onPageChange={handlePageChange}
              totalEpisodesCount={countEpisodes}
            />
            : (
              <div className={styles.placeholder}>
                There are no episodes in this playlist yet.
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default Playlist;
