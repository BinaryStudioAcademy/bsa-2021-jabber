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

  useEffect(() => {
    dispatch(podcastActions.loadPodcast(Number(id)));
  }, []);

  useEffect(() => {
    if (podcast) {
      dispatch(podcastActions.loadEpisodesByPodcastId(podcast.id));
    }
  }, [podcast]);

  if (dataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return (
    <main className={styles.podcast}>
      {podcast ? (
        <>
          <div className={styles.content}>
            <ImageWrapper
              src={podcast.cover?.url}
              loading="lazy"
              alt={podcast.name}
              label={podcast.name}
              className={styles.coverWrapper}
            />
            <div className={styles.podcastInfoWrapper}>
              <h1 className={styles.title}>{podcast.name}</h1>
              <div className={styles.descriptionWrapper}>
                <p className={styles.description}>{podcast.description}</p>
              </div>
              <p className={styles.type}>Type: {podcast.type}</p>
              {podcast.userId === userId && (
                <Link
                  to={`${AppRoute.PODCASTS}/${podcast.id}${AppRoute.EPISODES_EDIT}`}
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
