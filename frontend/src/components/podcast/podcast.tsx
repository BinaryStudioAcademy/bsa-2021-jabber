import { useAppSelector, useDispatch, useEffect, useParams } from 'hooks/hooks';
import { podcast as podcastActions } from 'store/actions';
import { AppRoute, DataStatus, DefaultImageSize } from 'common/enums/enums';
import { Link, Loader, DefaultImage } from 'components/common/common';
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
            <div className={styles.podcastInfoWrapper}>
              <h1 className={styles.title}>{podcast.name}</h1>
              <div className={styles.descriptionWrapper}>
                <p className={styles.description}>{podcast.description}</p>
              </div>
              <p className={styles.type}>Type: {podcast.type}</p>
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.wrapper}>
                {podcast.image ? (
                  <p className={styles.imageWrapper}>
                    <img
                      src={podcast.image.url}
                      className={styles.podcastImage}
                      width="280"
                      height="280"
                      loading="lazy"
                      alt={podcast.name}
                    />
                  </p>
                ) : (
                  <DefaultImage
                    label={podcast.name}
                    size={DefaultImageSize.LARGE}
                    className={styles.defaultImageWrapper}
                  />
                )}
                {podcast.userId === userId && (
                  <Link
                    to={`${AppRoute.PODCASTS}/${podcast.id}${AppRoute.EPISODES_EDIT}`}
                  >
                    Add episode
                  </Link>
                )}
              </div>
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
