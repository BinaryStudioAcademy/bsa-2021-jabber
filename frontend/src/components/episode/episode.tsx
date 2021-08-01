import { useAppSelector, useDispatch, useEffect, useParams } from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { episode as episodeActions } from 'store/actions';
import styles from './styles.module.scss';

interface ParamTypes {
  id: string
}

const Episode: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<ParamTypes>();

  const { episode } = useAppSelector(({ episode }: RootState) => ({
    //rename, bad readable
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
              <h1>English podcasts</h1>
              <h3>{episode?.name}</h3>
              <p>Aliens send Rick, Morty and Jerry into an alternate reality, and Rick tries to get them out as oblivious Jerry pitches a marketing slogan for apples.</p>
            </div>
            <div className={styles.logo}>
              <img src="#" width="280" height="280" loading="lazy" alt={episode?.name} />
            </div>
          </>
        ) : (
          <h1>There is no such episode</h1>
        )}
      </section>
    </div >
  );
};

export default Episode;
