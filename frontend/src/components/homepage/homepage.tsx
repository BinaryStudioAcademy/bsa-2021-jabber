import { DataStatus } from 'common/enums/enums';
import { PodcastSearchPayload } from 'common/types/types';
import { Loader, PodcastList } from 'components/common/common';
import {
  useAppSelector,
  useCallback,
  useDispatch,
  useEffect,
} from 'hooks/hooks';
import { homepage as homepageActions } from 'store/actions';
import { Search } from './components/components';
import { SEARCH_TIMEOUT } from './common/constants';
import { setDebounce } from 'helpers/helpers';
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
  }, []);

  const handleChange = useCallback(
    setDebounce((payload: PodcastSearchPayload) => {
      dispatch(homepageActions.loadPodcastsBySearch(payload));
    }, SEARCH_TIMEOUT),
    [],
  );

  if (dataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return (
    <main className={styles.main}>
      <Search onChange={handleChange} />
      <h2 className={styles.title}>All podcasts</h2>
      {hasPodcasts ? (
        <PodcastList podcasts={podcasts} />
      ) : (
        <span className={styles.oopsMessage}>
          Oops! There&apos;s nothing here
        </span>
      )}
    </main>
  );
};

export default Homepage;
