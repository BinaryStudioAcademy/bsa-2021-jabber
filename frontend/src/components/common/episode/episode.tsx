import { useAppSelector } from 'hooks/hooks';
import { RootState } from 'common/types/types';
import styles from './styles.module.scss';
import { store } from 'store/store';
import { loadEpisode } from 'store/episodepage/actions';

const Episode: React.FC = () => {
  const { episode } = useAppSelector(({ episodepage }: RootState) => ({
    episode: episodepage.episode,
  }));

  const hasEpisode = Boolean(episode);

  //episodeMock should be removed
  const episodeMock = {
    podcastsGroup: 'English podcasts',
    name: 'Episode 42',
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
          <>
            <div className={styles.description}>
              <h5>{episodeMock.podcastsGroup}</h5>
              <h3>{episodeMock.name}</h3>
              <p>
                {episodeMock.description}
              </p>
            </div>
            <div className={styles.logo}>
              <img src={episodeMock.img} alt="logo" />
            </div>
          </>
        )
        }
      </section>
    </section>
  );
};

store.dispatch(loadEpisode(3));

export default Episode;
