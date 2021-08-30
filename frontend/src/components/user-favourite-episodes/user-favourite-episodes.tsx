import styles from './styles.module.scss';
import { useAppSelector, useParams, useDispatch, useEffect, useState } from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { PageParams } from './common/types/types';
import { DataStatus } from 'common/enums/enums';
import { Loader } from 'components/common/common';
import { FavouriteEpisodeTable } from './components/components';
import { userFavouriteEpisodes as userFavouriteEpisodesActions } from 'store/actions';
import { getFilterEpisode } from 'helpers/helpers';
import { DEFAULT_EPISODE_PAGINATION, DEFAULT_EPISODE_PAGE } from './common/constants/constants';

const UserFavouriteEpisodesPage: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();
  const [episodePagination, setEpisodePagination] = useState(DEFAULT_EPISODE_PAGINATION);

  const { dataStatus, episodes, episodesCount } = useAppSelector(({ userFavouriteEpisodes }: RootState) => ({
    dataStatus: userFavouriteEpisodes.dataStatus,
    episodes: userFavouriteEpisodes.episodes,
    episodesCount: userFavouriteEpisodes.episodesCount,
  }));

  useEffect(() => {
    dispatch(userFavouriteEpisodesActions.loadFavouriteEpisodes({
      userId: Number(id),
      filter: getFilterEpisode(episodePagination.page, episodePagination.row),
    }));
  }, [id, episodePagination]);

  const isLoading = dataStatus === DataStatus.PENDING;

  const handleSetRowEpisodeFilter = (row: number): void => {
    setEpisodePagination({
      page: DEFAULT_EPISODE_PAGE,
      row,
    });
  };

  const handleSetOffsetEpisodeFilter = (page: number): void => {
    setEpisodePagination({
      page,
      row: episodePagination.row,
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Favourite episodes:</h1>
      {episodes.length
        ? <FavouriteEpisodeTable
          episodes={episodes}
          onSetRow={handleSetRowEpisodeFilter}
          onSetPage={handleSetOffsetEpisodeFilter}
          pageIndex={episodePagination.page}
          pageSize={episodePagination.row}
          totalCountEpisodes={episodesCount}
        />
        : (
          <div className={styles.placeholder}>
            There are no episodes in favourites yet.
          </div>
        )}
    </div>
  );
};

export default UserFavouriteEpisodesPage;
