import {
  Loader,
  PodcastList,
  ImageWrapper,
  Link,
  Button,
} from 'components/common/common';
import { AppRoute, DataStatus } from 'common/enums/enums';
import { RootState } from 'common/types/types';
import { useAppSelector, useParams, useDispatch, useEffect } from 'hooks/hooks';
import { userProfile as userProfileActions } from 'store/actions';
import contactLogo from 'assets/img/user-profile/contact.svg';
import emailLogo from 'assets/img/user-profile/email.svg';
import { PageParams } from './common/types/types';
import styles from './styles.module.scss';

const UserPage: React.FC = () => {
  const { id } = useParams<PageParams>();

  const {
    currentUser,
    user,
    podcasts,
    dataStatus,
    isFollowed,
    followersCount,
    followersDataStatus,
  } = useAppSelector(({ auth, userProfile }: RootState) => ({
    currentUser: auth.user,
    user: userProfile.user,
    podcasts: userProfile.podcasts,
    dataStatus: userProfile.dataStatus,
    isFollowed: userProfile.isFollowed,
    followersCount: userProfile.followersCount,
    followersDataStatus: userProfile.followersDataStatus,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileActions.loadUser(Number(id)));
    dispatch(userProfileActions.loadPodcasts(Number(id)));
  }, [id]);

  useEffect(() => {
    if (user) {
      dispatch(userProfileActions.getFollowersCount(user.id));
    }
  }, [user]);

  useEffect(() => {
    if (user && currentUser) {
      dispatch(
        userProfileActions.checkIsFollowedUser({
          userId: user.id,
          followerId: currentUser.id,
        }),
      );
    }
  }, [user, currentUser]);

  const hasUser = Boolean(user);
  const isShowFollowButton =
    Boolean(currentUser) && currentUser?.id !== user?.id;
  const isOwnPage = currentUser?.id === Number(id);
  const isLoading =
    dataStatus === DataStatus.PENDING ||
    followersDataStatus === DataStatus.PENDING;

  const handleToggleFollow = (): void => {
    if (user && currentUser) {
      dispatch(
        userProfileActions.toggleFollowUser({
          userId: user.id,
          followerId: currentUser.id,
        }),
      );
    }
  };

  if (!hasUser && dataStatus === DataStatus.FULFILLED) {
    return (
      <div className={styles.containerUserNotFound}>
        <h1>User Not Found</h1>
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <main className={styles.userInfo}>
        <ImageWrapper
          width="195"
          height="195"
          loading="lazy"
          label={user?.nickname}
          className={styles.imageWrapper}
          src={user?.image?.url}
        />
        <div className={styles.mainUserInfo}>
          <div className={styles.userInfoHeader}>
            <span className={styles.boldHeaderInfo}>
              {user?.firstName} {user?.lastName}
            </span>
            <span className={styles.headerInfo}>
              <img
                src={contactLogo}
                width="18"
                height="18"
                className={styles.headerLogo}
              />
              {user?.nickname}
            </span>
            <span className={styles.headerInfo}>
              <img
                src={emailLogo}
                width="18"
                height="18"
                className={styles.headerLogo}
              />
              <a className={styles.emailLink} href={`mailto:${user?.email}`}>
                {user?.email}
              </a>
            </span>
          </div>
          {user?.bio && (
            <div className={styles.bioContainer}>
              <span className={styles.bioTitle}>Bio:</span>
              <span className={styles.bioText}>{user?.bio}</span>
            </div>
          )}
        </div>
        {isOwnPage ? (
          <Link
            to={`${AppRoute.USERS_EDIT}/${id}`}
            className={styles.editLink}
          />
        ) : (
          <div className={styles.followContainer}>
            <div className={styles.followCountContainer}>
              <span className={styles.followCount}>{followersCount}</span>
              <span className={styles.followTitle}>Followers</span>
            </div>
            {isShowFollowButton && (
              <Button
                className={styles.followButton}
                label={isFollowed ? 'Unfollow' : 'Follow'}
                onClick={handleToggleFollow}
              />
            )}
          </div>
        )}
      </main>

      <div className={styles.podcastsByUserContainer}>
        <h2 className={styles.podcastsByUserTitle}>My Podcasts</h2>
        {podcasts.length ? (
          <PodcastList podcasts={podcasts} />
        ) : (
          <span className={styles.oopsMessage}>
            Oops! There&apos;s nothing here
          </span>
        )}
      </div>
    </div>
  );
};

export default UserPage;
