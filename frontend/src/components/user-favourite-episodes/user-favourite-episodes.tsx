import styles from './styles.module.scss';
import { useAppSelector, useParams, useDispatch, useEffect } from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { PageParams } from './common/types/types';
import { DataStatus } from 'common/enums/enums';
import { Loader } from 'components/common/common';
import { userProfile as userProfileActions } from 'store/actions';

const UserFavouriteEpisodesPage: React.FC = () => {
  const { id } = useParams<PageParams>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileActions.loadFavouriteEpisodes(Number(id)));
  }, [id]);

  const { favouriteEpisodes, dataStatus } = useAppSelector(({ userProfile }: RootState) => ({
    favouriteEpisodes: userProfile.favouriteEpisodes,
    dataStatus: userProfile.favouriteEpisodesDataStatus,
  }));

  const isLoading = dataStatus === DataStatus.PENDING;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Followers:</h2>
      <div className={styles.followersList}>
        {favouriteEpisodes.length}
        <div className={styles.placeholder}>No followers yet</div>
      </div>
    </div>
  );
};

export default UserFavouriteEpisodesPage;
