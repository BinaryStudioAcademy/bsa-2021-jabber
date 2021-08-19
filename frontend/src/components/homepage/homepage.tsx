import { DataStatus } from 'common/enums/enums';
import { PodcastSearchPayload } from 'common/types/types';
import { Loader, PodcastList } from 'components/common/common';
import {
  useAppSelector,
  useCallback,
  useDispatch,
  useEffect,
  useState,
} from 'hooks/hooks';
import { homepage as homepageActions } from 'store/actions';
import { Search } from './components/components';
import { SEARCH_TIMEOUT, DEFAULT_PODCASTS_FILTER_VALUE } from './common/constants';
import { setDebounce } from 'helpers/helpers';
import styles from './styles.module.scss';

const Homepage: React.FC = () => {
  const { podcasts, dataStatus } = useAppSelector(({ homepage }) => ({
    podcasts: homepage.podcasts,
    dataStatus: homepage.dataStatus,
  }));
  const dispatch = useDispatch();
  const hasPodcasts = Boolean(podcasts.length);
  const isLoading = dataStatus === DataStatus.PENDING;

  const [podcastsFilter, setPodcastsFilter] = useState(DEFAULT_PODCASTS_FILTER_VALUE);

  useEffect(() => {
    const isNewSearchQuery = podcastsFilter.offset === 0;
    if (isNewSearchQuery) {
      dispatch(homepageActions.loadPodcasts(podcastsFilter));
    } else {
      dispatch(homepageActions.loadMorePodcasts(podcastsFilter));
    }
  }, [podcastsFilter]);

  const handleChange = useCallback(
    setDebounce(({ search }: PodcastSearchPayload) => {
      setPodcastsFilter({
        ...podcastsFilter,
        offset: 0,
        search,
      });
    }, SEARCH_TIMEOUT),
    [],
  );

  const handleMorePodcastsLoad = (): void => {
    setPodcastsFilter({
      ...podcastsFilter,
      offset: podcastsFilter.offset + podcastsFilter.limit,
    });
  };

  return (
    <main className={styles.main}>
      <Search onChange={handleChange} />
      <h2 className={styles.title}>All podcasts</h2>
      {hasPodcasts ? (
        <>
          <PodcastList
            podcasts={podcasts}
            onMorePodcastsLoad={handleMorePodcastsLoad}
            isLoading={isLoading}
          />
          {isLoading && <Loader />}
        </>
      ) : isLoading ? (
        <Loader />
      ) : (
        <span className={styles.oopsMessage}>
          Oops! There&apos;s nothing here
        </span>
      )}
    </main>
  );
};

export default Homepage;
