import { useAppSelector, useDispatch, useEffect, useParams, useState } from 'hooks/hooks';
import {
  podcast as podcastActions,
  configuratePodcast as configuratePodcastActions,
} from 'store/actions';
import { AppRoute, DataStatus, UserRole } from 'common/enums/enums';
import { Link, Loader, ImageWrapper, ConfirmPopup, Button } from 'components/common/common';
import { EpisodeTable } from './components/components';
import { PageParams } from './common/types/types';
import styles from './styles.module.scss';
import { getAllowedClasses } from 'helpers/helpers';

const Podcast: React.FC = () => {
  const {
    userId,
    podcast,
    episodes,
    dataStatus,
    userRole,
    isFollowed,
    followersCount,
    followersDataStatus,
  } = useAppSelector(
    ({ podcast, auth }) => ({
      userId: auth.user?.id,
      userRole: auth.user?.role,
      podcast: podcast.podcast,
      episodes: podcast.episodes,
      dataStatus: podcast.dataStatus,
      isFollowed: podcast.isFollowed,
      followersCount: podcast.followersCount,
      followersDataStatus: podcast.followersDataStatus,
    }),
  );
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();
  const isOwner = userId === podcast?.userId;
  const isMaster = userRole === UserRole.MASTER;
  const isAllowDelete = isOwner || isMaster;
  const isShowFollowButton = Boolean(userId) && !isOwner;
  const isLoading = dataStatus === DataStatus.PENDING && followersDataStatus === DataStatus.PENDING;

  useEffect(() => {
    dispatch(podcastActions.loadPodcast(Number(id)));
    dispatch(podcastActions.loadEpisodesByPodcastId(Number(id)));
  }, []);

  useEffect(() => {
    if (podcast && userId) {
      dispatch(podcastActions.checkIsFollowedPodcast({
        podcastId: podcast.id,
        followerId: userId,
      }));
      dispatch(podcastActions.getFollowersCount(podcast.id));
    }
  }, [podcast, userId]);

  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState<boolean>(false);

  const handleDeletePodcast = (): void => {
    dispatch(
      configuratePodcastActions.deletePodcast({
        podcastId: Number(id),
        userId: Number(userId),
      }),
    );
  };

  const handleShowPopup = (): void => {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
  };

  const handleToggleFollow = (): void => {
    if (podcast && userId) {
      dispatch(podcastActions.toggleFollowPodcast({
        podcastId: podcast.id,
        followerId: userId,
      }));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className={styles.podcast}>
      {podcast && dataStatus === DataStatus.FULFILLED ? (
        <>
          <div className={styles.content}>
            <ImageWrapper
              src={podcast.cover?.url}
              loading="lazy"
              alt={podcast.name}
              label={podcast.name}
              className={styles.imageWrapper}
            />
            {podcast.userId === userId && (
              <Button
                className={styles.addEpisodeLink}
                label="Add episode"
                href={`${AppRoute.PODCASTS}/${podcast.id}${AppRoute.EPISODES_EDIT}`}
              />)
            }
            <div className={styles.podcastInfoWrapper}>
              {isOwner && (
                <Link
                  to={`${AppRoute.PODCASTS_EDIT}/${podcast.id}`}
                  className={styles.editLink}
                />
              )}
              {isAllowDelete && (
                <>
                  <button
                    onClick={handleShowPopup}
                    className={styles.deleteButton}
                  >
                    <span className="visually-hidden">Delete episode</span>
                  </button>
                  <ConfirmPopup
                    title="Delete Podcast"
                    description="You are going to delete the podcast. Are you sure about this?"
                    isOpen={isConfirmPopupOpen}
                    onClose={handleShowPopup}
                    onConfirm={handleDeletePodcast}
                  />
                </>
              )}
              <h1 className={styles.title}>{podcast.name}</h1>
              <p className={styles.description}>{podcast.description}</p>
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <div
                    className={getAllowedClasses(styles.infoName, styles.host)}
                  >
                    Host
                  </div>
                  <Link
                    className={styles.infoInner}
                    to={`${AppRoute.USERS}/${podcast.userId}`}
                  >
                    {podcast.user.nickname}
                  </Link>
                </li>
                {Boolean(episodes.length) && (
                  <li className={styles.infoItem}>
                    <div
                      className={getAllowedClasses(
                        styles.infoName,
                        styles.episodes,
                      )}
                    >
                      Episodes
                    </div>
                    <p className={styles.infoInner}>
                      {episodes.length} episodes
                    </p>
                  </li>
                )}
                <li className={styles.infoItem}>
                  <div
                    className={getAllowedClasses(
                      styles.infoName,
                      styles.period,
                    )}
                  >
                    Рeriodicity
                  </div>
                  <p className={styles.infoInner}>{podcast.periodicity}</p>
                </li>
                {podcast.genre && (
                  <li className={styles.infoItem}>
                    <div
                      className={getAllowedClasses(
                        styles.infoName,
                        styles.genre,
                      )}
                    >
                      Genre
                    </div>
                    <p className={styles.infoInner}>{podcast.genre.name}</p>
                  </li>
                )}
                <li className={styles.infoItem}>
                  <div
                    className={getAllowedClasses(styles.infoName, styles.type)}
                  >
                    Type
                  </div>
                  <p className={styles.infoInner}>{podcast.type}</p>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.followContainer}>
            <h2 className={styles.followTitle}>Followers:</h2>
            <span className={styles.followCount}>{followersCount}</span>
            {isShowFollowButton &&
            (<Button
              className={styles.followButton}
              label={isFollowed ? 'Unfollow' : 'Follow'}
              onClick={handleToggleFollow}
            />)}
          </div>
          {episodes.length ? (
            <EpisodeTable episodes={episodes} />
          ) : (
            <div className={styles.placeholder}>
              There are no episodes in this podcast yet.
            </div>
          )}
        </>
      ) : (
        <h1 className={styles.notFound}>Oops. There is no such podcast</h1>
      )}
    </main>
  );
};

export default Podcast;
