import { DataStatus, ButtonColor } from 'common/enums/enums';
import { PodcastSearchPayload, PodcastLoadFilter } from 'common/types/types';
import { Loader, PodcastList, Button } from 'components/common/common';
import {
  useAppSelector,
  useCallback,
  useDispatch,
  useEffect,
  useState,
} from 'hooks/hooks';
import { homepage as homepageActions } from 'store/actions';
import { Search, PopularUsers } from './components/components';
import {
  SEARCH_TIMEOUT,
  DEFAULT_PODCASTS_FILTER_VALUE,
  INITIAL_PAGE_OFFSET,
  DEFAULT_USER_POPULAR_FILTER_VALUE,
} from './common/constants';
import { setDebounce } from 'helpers/helpers';
import styles from './styles.module.scss';

const Homepage: React.FC = () => {
  const { dataStatus, podcasts, podcastsTotalCount, popularUsers, popularUsersDataStatus } = useAppSelector(({ homepage }) => ({
    dataStatus: homepage.dataStatus,
    podcasts: homepage.podcasts,
    podcastsTotalCount: homepage.podcastsTotalCount,
    popularUsers: homepage.popularUsers,
    popularUsersDataStatus: homepage.popularUsersDataStatus,
  }));
  const dispatch = useDispatch();
  const hasPodcasts = Boolean(podcasts.length);
  const isLoading = dataStatus === DataStatus.PENDING || popularUsersDataStatus === DataStatus.PENDING;
  const hasMorePodcasts = podcastsTotalCount > podcasts.length;

  const [podcastsFilter, setPodcastsFilter] = useState<PodcastLoadFilter>(DEFAULT_PODCASTS_FILTER_VALUE);

  useEffect(() => {
    const isNewSearchQuery = podcastsFilter.offset === INITIAL_PAGE_OFFSET;
    if (isNewSearchQuery) {
      dispatch(homepageActions.loadPodcasts(podcastsFilter));
    } else {
      dispatch(homepageActions.loadMorePodcasts(podcastsFilter));
    }
  }, [podcastsFilter]);

  useEffect(() => {
    dispatch(homepageActions.loadPopularUsers(DEFAULT_USER_POPULAR_FILTER_VALUE));
  }, []);

  const handleChange = useCallback(
    setDebounce(({ search }: PodcastSearchPayload) => {
      setPodcastsFilter({
        ...podcastsFilter,
        offset: INITIAL_PAGE_OFFSET,
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
      <PopularUsers popularUsers={popularUsers} />
      <h2 className={styles.title}>All podcasts</h2>
      {hasPodcasts ? (
        <>
          <PodcastList podcasts={podcasts} />
          {isLoading
            ? <Loader />
            : hasMorePodcasts &&
            <Button
              className={styles.loadMoreBtn}
              label="See more"
              buttonColor={ButtonColor.LIGHT_PINK}
              onClick={handleMorePodcastsLoad}
            />}
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
