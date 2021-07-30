import styles from './styles.module.scss';

const Episode: React.FC = () => {
  // "episodeMock" should be removed when backend services are ready
  const episodeMock = {
    podcastsGroup: 'English podcasts',
    name: 'Episode 42',
    img: 'https://i.pinimg.com/474x/19/28/de/1928deaa3f4ba47822a5c1723f4b930f.jpg',
    description: 'Aliens send Rick, Morty and Jerry into an alternate reality, and Rick tries to get them out as oblivious Jerry pitches a marketing slogan for apples.',
  };

  return (
    <section className={styles.episode}>
      <section className={styles.episodeHeader}>
        <div className={styles.description}>
          <h5>{episodeMock.podcastsGroup}</h5>
          <h3>{episodeMock.name}</h3>
          <p>
            {episodeMock.description}
          </p>
        </div>
        <div className={styles.logo}>
          <img src={episodeMock.img} alt="Episode logo" />
        </div>
      </section>
    </section>
  );
};

export default Episode;
