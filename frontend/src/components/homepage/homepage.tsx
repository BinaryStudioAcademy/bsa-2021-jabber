import { DataStatus, ButtonColor, AppRoute } from 'common/enums/enums';
import { PodcastSearchPayload, PodcastLoadFilter, GenresFilter } from 'common/types/types';
import { PODCAST_LOAD_LIMIT } from 'common/constants/constants';
import { Loader, PodcastList, Button, PodcastFilter } from 'components/common/common';
import {
  useAppSelector,
  useCallback,
  useDispatch,
  useEffect,
  useState,
  useParams,
} from 'hooks/hooks';
import { homepage as homepageActions } from 'store/actions';
import { getStringifiedQuery } from 'helpers/helpers';
import { Search, PopularUsers } from './components/components';
import { navigation as navigationService } from 'services/services';
import {
  SEARCH_TIMEOUT,
  DEFAULT_PODCASTS_FILTER_VALUE,
  INITIAL_PAGE_OFFSET,
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
    podcastsTotalCount,
    popularUsers,
    popularUsersDataStatus,
  } = useAppSelector(({ homepage }) => ({
    podcasts: homepage.podcasts,
    dataStatus: homepage.dataStatus,
    genres: homepage.genres,
    genresDataStatus: homepage.genresDataStatus,
    podcastsTotalCount: homepage.podcastsTotalCount,
    popularUsers: homepage.popularUsers,
    popularUsersDataStatus: homepage.popularUsersDataStatus,
  }));
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [podcastsFilter, setPodcastsFilter] = useState<PodcastLoadFilter>(DEFAULT_PODCASTS_FILTER_VALUE);
  const dispatch = useDispatch();

  const hasPodcasts = Boolean(podcasts.length);
  const isLoading = dataStatus === DataStatus.PENDING || popularUsersDataStatus === DataStatus.PENDING;
  const isGenresLoaded = genresDataStatus === DataStatus.FULFILLED;
  const hasMorePodcasts = podcastsTotalCount > podcastsFilter.offset + PODCAST_LOAD_LIMIT;

  useEffect(() => {
    dispatch(homepageActions.loadGenres());
    dispatch(homepageActions.loadPopularUsers(DEFAULT_USER_POPULAR_FILTER_VALUE));
    return (): void => {
      dispatch(homepageActions.leaveHomepage());
    };
  }, []);

  const { params } = useParams<{ params: string | undefined }>();

  useEffect(() => {

    if (params) {
      const parsedQuery = getParsedQuery(params);

      if (!parsedQuery) {
        navigationService.push(AppRoute.ROOT);
        return;
      }

      const isСonsistentLoad = parsedQuery.offset === podcastsFilter.offset + PODCAST_LOAD_LIMIT;
      setPodcastsFilter(parsedQuery);

      if (isСonsistentLoad) {
        dispatch(homepageActions.loadMorePodcasts(parsedQuery));
      } else {
        dispatch(homepageActions.loadPodcasts(parsedQuery));
      }
    } else {
      setPodcastsFilter(DEFAULT_PODCASTS_FILTER_VALUE);
      dispatch(homepageActions.loadPodcasts(DEFAULT_PODCASTS_FILTER_VALUE));
    }
  }, [params]);

  const handleChange = useCallback(
    setDebounce(({ search }: PodcastSearchPayload) => {
      navigationService.push(
        getStringifiedQuery({
          ...podcastsFilter,
          offset: INITIAL_PAGE_OFFSET,
          search,
        }),
      );
    }, SEARCH_TIMEOUT),
    [podcastsFilter],
  );

  const handleSetGenres = (data: GenresFilter): void => {
    const selectedGenres = getSelectedGenres(data, genres);

    navigationService.push(
      getStringifiedQuery({
        ...podcastsFilter,
        offset: INITIAL_PAGE_OFFSET,
        genres: selectedGenres,
      }),
    );

    setIsFilterVisible(false);
  };

  const handleClosePodcastFilter = (): void => {
    setIsFilterVisible(false);
  };

  const handleMorePodcastsLoad = (): void => {
    navigationService.push(
      getStringifiedQuery({
        ...podcastsFilter,
        offset: podcastsFilter.offset + PODCAST_LOAD_LIMIT,
      }),
    );
  };

  const handleTogglePodcastFilter = (): void => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <main className={styles.main}>
      <Search onChange={handleChange} currentState={podcastsFilter.search} />
      <PopularUsers popularUsers={popularUsers} />
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
      {isFilterVisible && (
        <PodcastFilter
          genres={genres}
          onApply={handleSetGenres}
          onCancel={handleClosePodcastFilter}
          currentState={podcastsFilter}
        />
      )}
    </main>
  );
};

export default Homepage;
