import { DataStatus, AppRoute } from 'common/enums/enums';
import { PodcastSearchPayload, PodcastLoadFilter, GenresFilter } from 'common/types/types';
import { Loader, PodcastList, PodcastFilterPopup, Pagination } from 'components/common/common';
import {
  useAppSelector,
  useCallback,
  useDispatch,
  useEffect,
  useState,
  useLocation,
  useHistory,
} from 'hooks/hooks';
import { homepage as homepageActions } from 'store/actions';
import { getStringifiedQuery } from 'helpers/helpers';
import { Search, PopularUsers } from './components/components';
import {
  SEARCH_TIMEOUT,
  DEFAULT_PODCASTS_FILTER_VALUE,
  INITIAL_PAGE,
  DEFAULT_USER_POPULAR_FILTER_VALUE,
} from './common/constants';
import { DEFAULT_PAGE_COUNT } from 'common/constants/constants';
import { getSelectedGenres, getParsedQuery } from './helpers/helpers';
import { setDebounce } from 'helpers/helpers';
import styles from './styles.module.scss';

const Homepage: React.FC = () => {
  const {
    podcasts,
    dataStatus,
    genres,
    genresDataStatus,
    totalPagesCount,
    popularUsers,
    popularUsersDataStatus,
  } = useAppSelector(({ homepage }) => ({
    podcasts: homepage.podcasts,
    dataStatus: homepage.dataStatus,
    genres: homepage.genres,
    genresDataStatus: homepage.genresDataStatus,
    totalPagesCount: homepage.totalPagesCount,
    popularUsers: homepage.popularUsers,
    popularUsersDataStatus: homepage.popularUsersDataStatus,
  }));
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState<boolean>(false);
  const [podcastsFilter, setPodcastsFilter] = useState<PodcastLoadFilter>(DEFAULT_PODCASTS_FILTER_VALUE);
  const dispatch = useDispatch();
  const history = useHistory();

  const hasPodcasts = Boolean(podcasts.length);
  const isPodcastsLoading = dataStatus === DataStatus.PENDING;
  const isPopularUsersLoading = popularUsersDataStatus === DataStatus.PENDING;
  const isGenresLoaded = genresDataStatus === DataStatus.FULFILLED;
  const hasEnoughPageCount = totalPagesCount > DEFAULT_PAGE_COUNT;

  useEffect(() => {
    dispatch(homepageActions.loadGenres());
    dispatch(homepageActions.loadPopularUsers(DEFAULT_USER_POPULAR_FILTER_VALUE));
    return (): void => {
      dispatch(homepageActions.leaveHomepage());
    };
  }, []);

  const { search } = useLocation<{ params: string | undefined }>();

  useEffect(() => {
    if (search) {
      const parsedQuery = getParsedQuery(search);

      if (!parsedQuery) {
        history.push(AppRoute.ROOT);
        return;
      }

      setPodcastsFilter(parsedQuery);
      dispatch(homepageActions.loadPodcasts(parsedQuery));
    } else {
      setPodcastsFilter(DEFAULT_PODCASTS_FILTER_VALUE);
      dispatch(homepageActions.loadPodcasts(DEFAULT_PODCASTS_FILTER_VALUE));
    }
  }, [search]);

  const handleChange = useCallback(
    setDebounce(({ search }: PodcastSearchPayload) => {
      history.push({
        search: getStringifiedQuery({
          ...podcastsFilter,
          page: INITIAL_PAGE,
          search,
        }),
      });
    }, SEARCH_TIMEOUT),
    [podcastsFilter],
  );

  const handleSetGenres = (data: GenresFilter): void => {
    const selectedGenres = getSelectedGenres(data, genres);

    history.push({
      search: getStringifiedQuery({
        ...podcastsFilter,
        page: INITIAL_PAGE,
        genres: selectedGenres,
      }),
    });

    setIsFilterPopupOpen(false);
  };

  const handleClosePodcastFilter = (): void => {
    setIsFilterPopupOpen(false);
  };

  const handlePageChange = (selectedPage: number): void => {
    history.push({
      search: getStringifiedQuery({
        ...podcastsFilter,
        page: selectedPage,
      }),
    });
  };

  const handleTogglePodcastFilter = (): void => {
    setIsFilterPopupOpen(!isFilterPopupOpen);
  };

  return (
    <main className={styles.main}>
      <Search onChange={handleChange} currentState={podcastsFilter.search} />
      {isPopularUsersLoading ? (
        <Loader />
      ) : (
        <PopularUsers popularUsers={popularUsers} />
      )}
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>All podcasts</h2>
        {isGenresLoaded && (
          <button
            onClick={handleTogglePodcastFilter}
            className={styles.btnFilter}
          />
        )}
      </div>
      {hasPodcasts ? (
        <>
          <PodcastList podcasts={podcasts} />
          {isPodcastsLoading && <Loader />}
        </>
      ) : isPodcastsLoading ? (
        <Loader />
      ) : (
        <span className={styles.oopsMessage}>
          Oops! There&apos;s nothing here
        </span>
      )}
      {hasEnoughPageCount &&
        <Pagination
          pageCount={totalPagesCount}
          currentPage={podcastsFilter.page}
          onPageChange={handlePageChange}
          className={styles.pagination}
        />
      }
      <PodcastFilterPopup
        isOpen={isFilterPopupOpen}
        genres={genres}
        onApply={handleSetGenres}
        onCancel={handleClosePodcastFilter}
        currentState={podcastsFilter}
      />
    </main>
  );
};

export default Homepage;
