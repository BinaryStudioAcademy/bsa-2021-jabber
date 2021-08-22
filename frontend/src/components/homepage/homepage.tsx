import { DataStatus, ButtonColor } from 'common/enums/enums';
import { PodcastSearchPayload, PodcastLoadFilter, GenresFilter } from 'common/types/types';
import { Loader, PodcastList, Button, PodcastFilter } from 'components/common/common';
import {
  useAppSelector,
  useCallback,
  useDispatch,
  useEffect,
  useState,
} from 'hooks/hooks';
import { homepage as homepageActions } from 'store/actions';
import { Search } from './components/components';
import { SEARCH_TIMEOUT, DEFAULT_PODCASTS_FILTER_VALUE, INITIAL_PAGE_OFFSET } from './common/constants';
import { getSelectedGenres } from './helpers/helpers';
import { setDebounce } from 'helpers/helpers';
import styles from './styles.module.scss';

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

  useEffect(() => {
    const isNewSearchQuery = podcastsFilter.offset === INITIAL_PAGE_OFFSET;
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
        offset: INITIAL_PAGE_OFFSET,
        search,
      });
    }, SEARCH_TIMEOUT),
    [podcastsFilter],
  );

  const handleSetGenres = (data: GenresFilter): void => {
    const selectedGenres = getSelectedGenres(data, genres);

    setPodcastsFilter({
      ...podcastsFilter,
      offset: INITIAL_PAGE_OFFSET,
      genres: selectedGenres,
    });

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

  const handleTogglePodcastFilter = (): void => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <main className={styles.main}>
      <Search onChange={handleChange} />
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
