import { useAppSelector, useDispatch, useEffect, useParams, useState } from 'hooks/hooks';
import {
  podcast as podcastActions,
  configuratePodcast as configuratePodcastActions,
} from 'store/actions';
import { AppRoute, DataStatus } from 'common/enums/enums';
import { Link, Loader, ImageWrapper, ConfirmPopup } from 'components/common/common';
import { EpisodeTable } from './components/components';
import { PageParams } from './common/types/types';
import styles from './styles.module.scss';
import { getAllowedClasses } from 'helpers/helpers';

const Podcast: React.FC = () => {
  const { userId, podcast, episodes, dataStatus } = useAppSelector(
    ({ podcast, auth }) => ({
      userId: auth.user?.id,
      podcast: podcast.podcast,
      episodes: podcast.episodes,
      dataStatus: podcast.dataStatus,
    }),
  );
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();
  const isOwner = userId === podcast?.userId;

  useEffect(() => {
    dispatch(podcastActions.loadPodcast(Number(id)));
    dispatch(podcastActions.loadEpisodesByPodcastId(Number(id)));
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleDeletePodcast = (): void => {
    dispatch(
      configuratePodcastActions.deletePodcast({
        podcastId: Number(id),
        userId: Number(userId),
      }),
    );
  };

  const handleShowModal = (): void => {
    setShowModal(!showModal);
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
            <div className={styles.podcastInfoWrapper}>
              {isOwner && (
                <>
                  <Link
                    to={`${AppRoute.PODCASTS_EDIT}/${podcast.id}`}
                    className={styles.editLink}
                  />
                  <button
                    onClick={handleShowModal}
                    className={styles.deleteButton}
                  >
                    <span className="visually-hidden">Delete episode</span>
                  </button>
                  <ConfirmPopup
                    isShowModal={showModal}
                    onCloseModal={handleShowModal}
                    onDelete={handleDeletePodcast}
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
                    <p>{podcast.user.nickname}</p>
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
                <li className={styles.infoItem}>
                  <div
                    className={getAllowedClasses(styles.infoName, styles.genre)}
                  >
                    Genre
                  </div>
                  <p className={styles.infoInner}>{podcast.genre?.name}</p>
                </li>
              </ul>

              {podcast.userId === userId && (
                <Link
                  to={`${AppRoute.PODCASTS}/${podcast.id}${AppRoute.EPISODES_EDIT}`}
                  className={styles.addEpisodeLink}
                >
                  Add episode
                </Link>
              )}
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
