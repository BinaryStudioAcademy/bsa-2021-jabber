import styles from './styles.module.scss';
import { useAppSelector, useParams, useDispatch, useEffect } from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { PageParams } from './common/types/types';
import { userProfile as userProfileActions } from 'store/actions';
import FollowerItem from './components/follower-item/follower-item';

const UserFollowersPage: React.FC = () => {
  const { id } = useParams<PageParams>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileActions.loadFollowersByUserId(Number(id)));
  }, [id]);

  const { followers } = useAppSelector(({ userProfile }: RootState) => ({
    followers: userProfile.followers,
  }));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Followers:</h2>
      <div className={styles.followersList}>
        {followers.length
          ? followers.map((follower) => (
            <FollowerItem key={follower.id} follower={follower} />
          ))
          : <div  className={styles.placeholder}>No followers yet</div>
        }
      </div>
    </div>
  );
};

export default UserFollowersPage;
