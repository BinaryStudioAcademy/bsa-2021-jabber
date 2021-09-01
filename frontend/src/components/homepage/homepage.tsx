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
  const isLoading = dataStatus === DataStatus.PENDING || popularUsersDataStatus === DataStatus.PENDING;
  const isGenresLoaded = genresDataStatus === DataStatus.FULFILLED;

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

      const isСonsistentLoad = parsedQuery.page === podcastsFilter.page + 1;
      setPodcastsFilter(parsedQuery);

      dispatch(isСonsistentLoad ? homepageActions.loadMorePodcasts(parsedQuery) : homepageActions.loadPodcasts(parsedQuery));
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

  // const handleMorePodcastsLoad = (): void => {
  //   history.push({
  //     search: getStringifiedQuery({
  //       ...podcastsFilter,
  //       page: podcastsFilter.page + 1,
  //     }),
  //   });
  // };

  const handleTogglePodcastFilter = (): void => {
    setIsFilterPopupOpen(!isFilterPopupOpen);
  };

  return (
    <main className={styles.main}>
      <Pagination pageCount={totalPagesCount} currentPage={INITIAL_PAGE} onPageChange={(selected: number): void => {
        // eslint-disable-next-line no-console
        console.log(selected);
      }}/>
      <Search onChange={handleChange} currentState={podcastsFilter.search} />
      {isLoading
        ? <Loader />
        : <PopularUsers popularUsers={popularUsers} />}
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
        <PodcastList podcasts={podcasts} />
      ) : isLoading ? (
        <Loader />
      ) : (
        <span className={styles.oopsMessage}>
          Oops! There&apos;s nothing here
        </span>
      )}
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
