import styles from './styles.module.scss';
import { useAppSelector, useParams, useDispatch, useEffect } from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { PageParams } from './common/types/types';
import { userFollowers as userFollowersActions } from 'store/actions';
// import FollowerItem from './components/follower-item/follower-item';

const UserFollowersPage: React.FC = () => {
  const { id } = useParams<PageParams>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userFollowersActions.loadFollowersByUserId(Number(id)));
  }, [id]);

  const { followers } = useAppSelector(({ userFollowers }: RootState) => ({
    followers: userFollowers,
  }));

  // eslint-disable-next-line no-console
  console.log('followers', followers);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Followers:</h2>
      <div className={styles.followersList}>
        {/* {followers.map((follower) => (
          <FollowerItem key={follower.id} user={follower} />
        ))} */}
      </div>
    </div>
  );
};

export default UserFollowersPage;
