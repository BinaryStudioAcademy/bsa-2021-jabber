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
    const selectedGenres = data.genresFilter.reduce<number[]>((acc, genre, index) => {
      if (genre) {
        acc.push(genres[index].id);
      }
      return acc;
    }, []);

    setPodcastsFilter({
      ...podcastsFilter,
      offset: INITIAL_PAGE_OFFSET,
      genres: selectedGenres,
    });
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
        {isGenresLoaded  && <PodcastFilter genres={genres} onSetGenres={handleSetGenres} currentState={podcastsFilter}/>}
      </div>
      {hasPodcasts ? (
        <>
          <PodcastList podcasts={podcasts} />
          {isLoading ? <Loader /> : <Button className={styles.loadMoreBtn} label="See more" buttonColor={ButtonColor.LIGHT_PINK} onClick={handleMorePodcastsLoad}/> }
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
