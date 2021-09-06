import {
  Loader,
  PodcastList,
  ImageWrapper,
  Link,
  Button,
} from 'components/common/common';
import { AppRoute, ButtonColor, DataStatus } from 'common/enums/enums';
import { RootState } from 'common/types/types';
import { useAppSelector, useParams, useDispatch, useEffect, useState } from 'hooks/hooks';
import { userProfile as userProfileActions } from 'store/actions';
import contactLogo from 'assets/img/user-profile/contact.svg';
import emailLogo from 'assets/img/user-profile/email.svg';
import { PageParams } from './common/types/types';
import { getFilterEpisode } from 'helpers/helpers';
import { FavouriteEpisodeTable } from './components/components';
import { DEFAULT_EPISODE_PAGINATION } from './common/constants/constants';
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
    favoriteEpisodes,
    favoriteEpisodesCount,
  } = useAppSelector(({ auth, userProfile }: RootState) => ({
    currentUser: auth.user,
    user: userProfile.user,
    podcasts: userProfile.podcasts,
    dataStatus: userProfile.dataStatus,
    isFollowed: userProfile.isFollowed,
    followersCount: userProfile.followersCount,
    followersDataStatus: userProfile.followersDataStatus,
    favoriteEpisodes: userProfile.favoriteEpisodes,
    favoriteEpisodesCount: userProfile.favoriteEpisodesTotalCount,
  }));

  const dispatch = useDispatch();

  const [episodePagination, setEpisodePagination] = useState(DEFAULT_EPISODE_PAGINATION);
  const isOwner = currentUser?.id === user?.id;
  const totalPagesCount = Math.ceil(favoriteEpisodesCount / episodePagination.row);

  useEffect(() => {
    if (isOwner) {
      dispatch(userProfileActions.loadFavouriteEpisodes({
        userId: Number(id),
        filter: getFilterEpisode(episodePagination.page, episodePagination.row),
      }));
    }
  }, [id, episodePagination, user]);

  const handlePageChange = (selectedPage: number): void => {
    setEpisodePagination({
      page: selectedPage,
      row: episodePagination.row,
    });
  };

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
  const hasFavoriteEpisodes = Boolean(favoriteEpisodes.length);

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

  if (!hasUser && dataStatus === DataStatus.FULFILLED || dataStatus === DataStatus.REJECTED) {
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
        {isOwnPage && (
          <Link
            to={`${AppRoute.USERS_EDIT}/${id}`}
            className={styles.editLink}
          />
        )}
        <div className={styles.followContainer}>
          <Link
            to={`${AppRoute.USERS}/${id}${AppRoute.FOLLOWERS}`}
            className={styles.followCountContainer}
          >
            <span className={styles.followCount}>{followersCount}</span>
            <span className={styles.followTitle}>Followers</span>
          </Link>

          {isShowFollowButton && (
            <Button
              className={styles.followButton}
              label={isFollowed ? 'Unfollow' : 'Follow'}
              onClick={handleToggleFollow}
              buttonColor={isFollowed ? ButtonColor.LIGHT_PINK : ButtonColor.PINK}
            />
          )}
        </div>

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
      {isOwner && <div className={styles.favoriteEpisodes}>
        <h2 className={styles.podcastsByUserTitle}>Favorite episodes:</h2>
        {hasFavoriteEpisodes
          ? <FavouriteEpisodeTable
            episodes={favoriteEpisodes}
            totalFavoriteCount={favoriteEpisodesCount}
            pageCount={totalPagesCount}
            onPageChange={handlePageChange}
            currentPage={episodePagination.page}
          />
          : (
            <div className={styles.placeholder}>
              There are no episodes in favorites yet.
            </div>
          )}
      </div>}
    </div>
  );
};

export default UserPage;
