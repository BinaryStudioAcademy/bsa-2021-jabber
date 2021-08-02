import { useAppSelector, useDispatch, useLocation, useEffect } from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { episode as episodeActions } from 'store/actions';
import styles from './styles.module.scss';

const Episode: React.FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const episodeId = Number(pathname.split('/').pop());

  useEffect(() => {
    dispatch(episodeActions.loadEpisode(episodeId));
  }, []);

  const { episode } = useAppSelector(({ episode }: RootState) => ({
    episode: episode.episode,
  }));

  const hasEpisode = Boolean(episode);

  const episodeMock = {
    podcastsGroup: 'English podcasts',
    img: 'https://i.pinimg.com/474x/19/28/de/1928deaa3f4ba47822a5c1723f4b930f.jpg',
    description: 'Aliens send Rick, Morty and Jerry into an alternate reality, and Rick tries to get them out as oblivious Jerry pitches a marketing slogan for apples.',
  };

  return (
    <section className={styles.episode}>
      <section className={styles.episodeHeader}>
        {hasEpisode ? (
          <>
            <div className={styles.description}>
              <h5>{episodeMock.podcastsGroup}</h5>
              <h3>{episode?.name}</h3>
              <p>{episodeMock.description}</p>
            </div>
            <div className={styles.logo}>
              <img src={episodeMock.img} alt="logo" />
            </div>
          </>
        ) : (
          <p>Ups, something went wrong</p>
        )
        }
      </section>
    </section>
  );
};

export default Episode;
