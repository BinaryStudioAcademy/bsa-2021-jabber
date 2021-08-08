import { useAppSelector, useDispatch, useEffect, useParams } from 'hooks/hooks';
import {
  podcast as podcastActions,
  episode as episodeActions,
} from 'store/actions';
import { EpisodeTable } from './components/components';
import { PageParams } from './common/types/types';
import styles from './styles.module.scss';

const Podcast: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();

  const { podcast, episodes } = useAppSelector(({ podcast, episode }) => ({
    podcast: podcast.podcast,
    episodes: episode.episodes,
  }));

  useEffect(() => {
    dispatch(podcastActions.loadPodcast(Number(id)));
  }, []);

  useEffect(() => {
    if (podcast) {
      dispatch(episodeActions.loadEpisodesByPodcastId(podcast.id));
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
            <p className={styles.logoWrapper}>
              <img
                src="#"
                width="280"
                height="280"
                loading="lazy"
                alt={podcast.name}
              />
            </p>
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
