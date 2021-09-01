import { useAppSelector, useParams, useDispatch, useEffect, useState } from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { PageParams } from './common/types/types';
import { DataStatus } from 'common/enums/enums';
import { Loader, Pagination } from 'components/common/common';
import { FavouriteEpisodeTable } from './components/components';
import { userFavouriteEpisodes as userFavouriteEpisodesActions } from 'store/actions';
import { getFilterEpisode } from 'helpers/helpers';
import { DEFAULT_EPISODE_PAGINATION } from './common/constants/constants';
import styles from './styles.module.scss';

const UserFavouriteEpisodesPage: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();
  const [episodePagination, setEpisodePagination] = useState(DEFAULT_EPISODE_PAGINATION);

  const { dataStatus, episodes, episodesTotalCount } = useAppSelector(({ userFavouriteEpisodes }: RootState) => ({
    dataStatus: userFavouriteEpisodes.dataStatus,
    episodes: userFavouriteEpisodes.episodes,
    episodesTotalCount: userFavouriteEpisodes.episodesTotalCount,
  }));

  useEffect(() => {
    dispatch(userFavouriteEpisodesActions.loadFavouriteEpisodes({
      userId: Number(id),
      filter: getFilterEpisode(episodePagination.page, episodePagination.row),
    }));
  }, [id, episodePagination]);

  const isLoading = dataStatus === DataStatus.PENDING;
  const totalPagesCount = Math.ceil(episodesTotalCount / episodePagination.row);

  const handlePageChange = (selectedPage: number): void => {
    setEpisodePagination({
      page: selectedPage,
      row: episodePagination.row,
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      {episodes.length
        ? (<>
          <h1 className={styles.title}>Favourite episodes:</h1>
          <FavouriteEpisodeTable
            episodes={episodes}
          />
          <Pagination
            pageCount={totalPagesCount}
            currentPage={episodePagination.page}
            onPageChange={handlePageChange}
            className={styles.pagination}
          />
        </>)
        : (
          <div className={styles.placeholder}>
            There are no episodes in favourites yet.
          </div>
        )}
    </div >
  );
};

export default UserFavouriteEpisodesPage;
