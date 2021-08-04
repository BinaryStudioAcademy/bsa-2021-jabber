import { DataStatus } from 'common/enums/enums';
import { Loader } from 'components/common/common';
import { useAppSelector, useDispatch, useEffect } from 'hooks/hooks';
import { homepage as homepageActions } from 'store/actions';
import { PodcastList } from './components/components';
import styles from './styles.module.scss';

const Homepage: React.FC = () => {
  const { podcasts, dataStatus } = useAppSelector(({ homepage }) => ({
    podcasts: homepage.podcasts,
    dataStatus: homepage.dataStatus,
  }));
  const dispatch = useDispatch();
  const hasPodcasts = Boolean(podcasts.length);

  useEffect(() => {
    dispatch(homepageActions.loadPodcasts());
  }, [dispatch]);

  if (dataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>All podcasts</h2>
      { hasPodcasts ?
        <PodcastList podcasts={podcasts}/> :
        <span className={styles.oopsMessage}>Oops! There&apos;s nothing here</span>
      }
    </main>
  );
};

export default Homepage;
