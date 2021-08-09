import { useAppSelector, useDispatch, useEffect, useParams } from 'hooks/hooks';
import {
  podcast as podcastActions,
} from 'store/actions';
import { EpisodeTable } from './components/components';
import { PageParams } from './common/types/types';
import defaultImage from 'assets/img/default-podcast-image.jpeg';
import styles from './styles.module.scss';

const Podcast: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();

  const { podcast, episodes } = useAppSelector(({ podcast }) => ({
    podcast: podcast.podcast,
    episodes: podcast.episodes,
  }));

  useEffect(() => {
    dispatch(podcastActions.loadPodcast(Number(id)));
  }, []);

  useEffect(() => {
    if (podcast) {
      dispatch(podcastActions.loadEpisodesByPodcastId(podcast.id));
    }
  }, [podcast]);

  return (
    <main className={styles.podcast}>
      {podcast ? (
        <>
          <div className={styles.content}>
            <div className={styles.descriptionWrapper}>
              <h1 className={styles.title}>{podcast.name}</h1>
              <p className={styles.description}>{podcast.description}</p>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.imageWrapper}>
                <img
                  src={podcast.image?.url ?? defaultImage}
                  className={styles.podcastImage}
                  width="280"
                  height="280"
                  loading="lazy"
                  alt={podcast.name}
                />
              </div>
            </div>
          </div>
          <EpisodeTable episodes={episodes} />
        </>
      ) : (
        <h1 className={styles.notFound}>Oops. There is no such podcast</h1>
      )}
    </main>
  );
};

export default Podcast;
