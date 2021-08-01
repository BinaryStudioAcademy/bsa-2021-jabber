import { useAppSelector, useDispatch, useEffect, useParams } from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { episode as episodeActions } from 'store/actions';
import { EpisodeParamType } from 'common/types/types';
import styles from './styles.module.scss';

const Episode: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<EpisodeParamType>();

  const { episode } = useAppSelector(({ episode }: RootState) => ({
    episode: episode.episode,
  }));

  useEffect(() => {
    dispatch(episodeActions.loadEpisode(Number(id)));
  }, []);

  const hasEpisode = Boolean(episode);

  return (
    <div className={styles.episode}>
      <section className={styles.episodeHeader}>
        {hasEpisode ? (
          <>
            <div className={styles.description}>
              <h1>There will be a podcast group here.</h1>
              <h3>{episode?.name}</h3>
              <p>There will be a episode description here.</p>
            </div>
            <div className={styles.logo}>
              <img src="#" width="280" height="280" loading="lazy" alt={episode?.name} />
            </div>
          </>
        ) : (
          <h1>There is no such episode</h1>
        )}
      </section>
    </div>
  );
};

export default Episode;
