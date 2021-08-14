import { useAppSelector, useDispatch, useEffect, useParams } from 'hooks/hooks';
import { podcast as podcastActions } from 'store/actions';
import { AppRoute, DataStatus } from 'common/enums/enums';
import { Link, Loader, ImageWrapper } from 'components/common/common';
import { EpisodeTable } from './components/components';
import { PageParams } from './common/types/types';
import styles from './styles.module.scss';

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

  if (dataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return (
    <main className={styles.podcast}>
      {podcast ? (
        <>
          <div className={styles.content}>
            <ImageWrapper
              src={podcast.image?.url}
              loading="lazy"
              alt={podcast.name}
              label={podcast.name}
              className={styles.imageWrapper}
            />
            <div className={styles.podcastInfoWrapper}>
              {isOwner && (
                <Link
                  to={`${AppRoute.PODCASTS_EDIT}/${podcast.id}`}
                  className={styles.editLink}
                />
              )}
              <h1 className={styles.title}>{podcast.name}</h1>
              <p className={styles.description}>{podcast.description}</p>
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <div className={`${styles.infoName} ${styles.host}`}>Host</div>
                  <p className={styles.infoInner}>{podcast.user.nickname}</p>
                </li>
                <li className={styles.infoItem}>
                  <div className={`${styles.infoName} ${styles.episodes}`}>Episodes</div>
                  <p className={styles.infoInner}>{episodes.length} episodes</p>
                </li>
                <li className={styles.infoItem}>
                  <div className={`${styles.infoName} ${styles.period}`}>Рeriodicity</div>
                  <p className={styles.infoInner}>Once a month</p>
                </li>
                <li className={styles.infoItem}>
                  <div className={`${styles.infoName} ${styles.average}`}>Average time</div>
                  <p className={styles.infoInner}>{podcast.userId} min</p>
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
