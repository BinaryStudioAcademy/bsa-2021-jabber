import { DataStatus } from 'common/enums/enums';
import { PodcastSearchPayload } from 'common/types/types';
// import { PODCAST_LOAD_LIMIT } from 'common/constants/constants';
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

const podcastsFilter = {
  offset: 0,
  limit: 10, //PODCAST_LOAD_LIMIT,
};

const Homepage: React.FC = () => {
  const { podcasts, dataStatus } = useAppSelector(({ homepage }) => ({
    podcasts: homepage.podcasts,
    dataStatus: homepage.dataStatus,
  }));
  const dispatch = useDispatch();
  const hasPodcasts = Boolean(podcasts.length);
  const isLoading = dataStatus === DataStatus.PENDING;

  useEffect(() => {
    dispatch(homepageActions.loadPodcasts(podcastsFilter));
  }, []);

  const handleChange = useCallback(
    setDebounce((payload: PodcastSearchPayload) => {
      dispatch(homepageActions.loadPodcastsBySearch(payload));
    }, SEARCH_TIMEOUT),
    [],
  );

  const handleMorePodcastsLoad = (): void => {
    dispatch(homepageActions.loadMorePodcasts(podcastsFilter));
  };

  return (
    <main className={styles.main}>
      <Search onChange={handleChange} />
      <h2 className={styles.title}>All podcasts</h2>
      {isLoading ? (
        <Loader />
      ) : hasPodcasts ? (
        <PodcastList podcasts={podcasts} onMorePodcastsLoad={handleMorePodcastsLoad} />
      ) : (
        <span className={styles.oopsMessage}>
          Oops! There&apos;s nothing here
        </span>
      )}
    </main>
  );
};

export default Homepage;
