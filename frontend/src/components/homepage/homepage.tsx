import { DataStatus } from 'common/enums/enums';
import { Loader } from 'components/common/common';
import { useAppSelector, useCallback, useDispatch, useEffect } from 'hooks/hooks';
import { homepage as homepageActions } from 'store/actions';
import { PodcastList, Search } from './components/components';
import { SEARCH_TIMEOUT } from './components/search/common/constants';
import { setDebounce } from 'jabber-shared/helpers/timeout/timeout';
import { FieldValues, UnpackNestedValue } from 'react-hook-form';
import styles from './styles.module.scss';

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

  const debounceValue = useCallback(setDebounce((value: UnpackNestedValue<FieldValues>) => {
    (dispatch(homepageActions.loadPodcastsBySearch(value)));
  }, SEARCH_TIMEOUT), []);

  const handleChange = (value: UnpackNestedValue<FieldValues>): void => {
    debounceValue(value);
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
