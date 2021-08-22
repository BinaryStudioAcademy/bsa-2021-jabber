import { DataStatus, ButtonColor } from 'common/enums/enums';
import { PodcastSearchPayload, PodcastLoadFilter, GenresFilter } from 'common/types/types';
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
import { Search } from './components/components';
import { navigation as navigationService } from 'services/services';
import { getStringifiedQuery, parseQueryString } from 'helpers/helpers';
import { SEARCH_TIMEOUT, DEFAULT_PODCASTS_FILTER_VALUE, INITIAL_PAGE_OFFSET } from './common/constants';
import { setDebounce } from 'helpers/helpers';
import styles from './styles.module.scss';

// type QueryParams = {
//   params: string;
// };

const Homepage: React.FC = () => {
  const { podcasts, dataStatus, genres, genresDataStatus } = useAppSelector(({ homepage }) => ({
    podcasts: homepage.podcasts,
    dataStatus: homepage.dataStatus,
    genres: homepage.genres,
    genresDataStatus: homepage.genresDataStatus,
  }));
  const dispatch = useDispatch();
  const hasPodcasts = Boolean(podcasts.length);
  const isLoading = dataStatus === DataStatus.PENDING;
  const isGenresLoaded = genresDataStatus === DataStatus.FULFILLED;
  const [podcastsFilter, setPodcastsFilter] = useState<PodcastLoadFilter>(DEFAULT_PODCASTS_FILTER_VALUE);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

  useEffect(() => {
    dispatch(homepageActions.loadGenres());
  }, []);

  const { params } = useParams<{ params: string | undefined }>();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(params);

    if (params) {
      // eslint-disable-next-line no-console
      console.log(parseQueryString(params));
      const parsedQuery = parseQueryString(params) as PodcastLoadFilter;
      setPodcastsFilter({
        ...podcastsFilter,
        search: parsedQuery.search || '',
        genres: parsedQuery.genres || [],
        limit: parsedQuery.limit || 0,
        offset: Number(parsedQuery.offset) || 0,
      });

      // eslint-disable-next-line no-console
      console.log(parsedQuery);

      const isNewSearchQuery = parsedQuery.offset === INITIAL_PAGE_OFFSET;
      if (isNewSearchQuery) {
        dispatch(homepageActions.loadPodcasts(parsedQuery));
      } else {
        dispatch(homepageActions.loadMorePodcasts(parsedQuery));
      }
    } else {
      dispatch(homepageActions.loadPodcasts(DEFAULT_PODCASTS_FILTER_VALUE));
    }

  }, [params]);

  // useEffect(() => {
  //   const isNewSearchQuery = podcastsFilter.offset === INITIAL_PAGE_OFFSET;
  //   if (isNewSearchQuery) {
  //     dispatch(homepageActions.loadPodcasts(podcastsFilter));
  //   } else {
  //     dispatch(homepageActions.loadMorePodcasts(podcastsFilter));
  //   }
  // }, [podcastsFilter]);

  const handleChange = useCallback(
    setDebounce(({ search }: PodcastSearchPayload) => {
      // setPodcastsFilter({
      //   ...podcastsFilter,
      //   offset: INITIAL_PAGE_OFFSET,
      //   search,
      // });
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

  const handleSetGenres = ({ genresFilter }: GenresFilter): void => {
    const selectedGenres = genres.reduce<number[]>((selectedGenres, genre) => {
      if (genresFilter[genre.key]) {
        selectedGenres.push(genre.id);
      }

      return selectedGenres;
    }, []);

    // setPodcastsFilter({
    //   ...podcastsFilter,
    //   offset: INITIAL_PAGE_OFFSET,
    //   genres: selectedGenres,
    // });

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
    setPodcastsFilter({
      ...podcastsFilter,
      offset: podcastsFilter.offset + podcastsFilter.limit,
    });
  };

  return (
    <main className={styles.main}>
      <Search onChange={handleChange} />
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>All podcasts</h2>

        {isGenresLoaded && (
          <div className={styles.filterGroup}>
            <button
              onClick={(): void => setIsFilterVisible(!isFilterVisible)}
              className={styles.btnFilter}
            />
            {isFilterVisible && (
              <PodcastFilter
                genres={genres}
                onApply={handleSetGenres}
                onCancel={handleClosePodcastFilter}
                currentState={podcastsFilter}
              />
            )}
          </div>
        )}
      </div>
      {hasPodcasts ? (
        <>
          <PodcastList podcasts={podcasts} />
          {isLoading ? (
            <Loader />
          ) : (
            <Button
              className={styles.loadMoreBtn}
              label="See more"
              buttonColor={ButtonColor.LIGHT_PINK}
              onClick={handleMorePodcastsLoad}
            />
          )}
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
