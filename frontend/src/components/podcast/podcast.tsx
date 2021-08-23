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
  const { userId, podcast, episodes, dataStatus, userRole } = useAppSelector(
    ({ podcast, auth }) => ({
      userId: auth.user?.id,
      userRole: auth.user?.role,
      podcast: podcast.podcast,
      episodes: podcast.episodes,
      dataStatus: podcast.dataStatus,
    }),
  );
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();
  const isOwner = userId === podcast?.userId;
  const isMaster = userRole === UserRole.MASTER;
  const isAllowDelete = isOwner || isMaster;

  useEffect(() => {
    dispatch(podcastActions.loadPodcast(Number(id)));
    dispatch(podcastActions.loadEpisodesByPodcastId(Number(id)));
  }, []);

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

  const handleSubscribePodcast = (): void => {
    dispatch(podcastActions.subscribePodcast(podcast.id));
  };

  if (dataStatus === DataStatus.PENDING) {
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
            {podcast.userId === userId
              ? (
                <Button
                  className={styles.addEpisodeLink}
                  label="Add episode"
                  href={`${AppRoute.PODCASTS}/${podcast.id}${AppRoute.EPISODES_EDIT}`}
                />
              )
              : (
                <Button
                  className={styles.addEpisodeLink}
                  label="Subscribe"
                  onClick={handleSubscribePodcast}
                />
              )
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
                  <p className={styles.infoInner}>Once a month</p>
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
