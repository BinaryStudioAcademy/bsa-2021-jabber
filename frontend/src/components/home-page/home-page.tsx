import styles from './styles.module.scss';
import { useAppSelector } from 'hooks/hooks';
import { PodcastList } from './components/components';

const HomePage: React.FC = () => {
  const { podcasts } = useAppSelector(({ homepage }) => ({ podcasts: homepage.podcasts }));

  return (
    <main className={styles.main}>
      <h2>All podcasts</h2>
      <PodcastList podcasts={podcasts} />
    </main>
  );
};

export default HomePage;
