import { useAppSelector, useDispatch, useEffect, useParams } from 'hooks/hooks';
import { episode as episodeActions } from 'store/actions';
import { PageParams } from './common/types/types';
import styles from './styles.module.scss';

const Episode: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();

  const { episodeInfo } = useAppSelector(({ episode }) => ({
    episodeInfo: episode.episode,
  }));

  useEffect(() => {
    dispatch(episodeActions.loadEpisode(Number(id)));
  }, []);

  const hasEpisode = Boolean(episodeInfo);

  return (
    <div className={styles.episode}>
      <section className={styles.episodeHeader}>
        {hasEpisode ? (
          <>
            <div className={styles.description}>
              <h1>There will be a podcast group here.</h1>
              <h3>{episodeInfo?.name}</h3>
              <p>{episodeInfo?.description}</p>
            </div>
            <div className={styles.logo}>
              <img src="#" width="280" height="280" loading="lazy" alt={episodeInfo?.name} />
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
