import { DataStatus } from 'common/enums/enums';
import { Loader } from 'components/common/common';
import { useAppSelector, useCallback, useDispatch, useEffect } from 'hooks/hooks';
import { homepage as homepageActions } from 'store/actions';
import { PodcastList, Search } from './components/components';
import styles from './styles.module.scss';
import { SEARCH_TIMEOUT } from './components/search/common/constants';
import { setDebounce } from 'jabber-shared/helpers/timeout/timeout';

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

  const debounceValue = useCallback(setDebounce((value) => {
    const data: Record<string, unknown> = { search: value };
    (dispatch(homepageActions.loadPodcastsBySearch(data)));
  }, SEARCH_TIMEOUT), []);

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>): void => {
    debounceValue(event.target.value);
  };

  if (dataStatus === DataStatus.PENDING) {
    return <Loader/>;
  }

  return (
    <main className={styles.main}>
      <Search
        onChange={handleChange}
      />
      <h2 className={styles.title}>All podcasts</h2>
      { hasPodcasts ?
        <PodcastList podcasts={podcasts}/> :
        <span className={styles.oopsMessage}>Oops! There&apos;s nothing here</span>
      }
    </main>
  );
};

export default Homepage;
