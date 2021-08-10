import { DataStatus } from 'common/enums/enums';
import { Loader } from 'components/common/common';
import { useAppSelector, useCallback, useDispatch, useEffect, useState } from 'hooks/hooks';
import { homepage as homepageActions } from 'store/actions';
import { PodcastList, Search } from './components/components';
import { SearchPayload } from './components/search/common/types/search';
import styles from './styles.module.scss';
import _ from 'lodash';

const Homepage: React.FC = () => {
  const { podcasts, dataStatus } = useAppSelector(({ homepage }) => ({
    podcasts: homepage.podcasts,
    dataStatus: homepage.dataStatus,
  }));
  const dispatch = useDispatch();
  const hasPodcasts = Boolean(podcasts.length);

  const [text, setText] = useState<string>('');

  useEffect(() => {
    dispatch(homepageActions.loadPodcasts());
  }, []);

  const debounceValue = useCallback(_.debounce((value) =>
    (dispatch(homepageActions.searchPodcasts(value))), 1000), []);

  const handleChange = ({ search }: SearchPayload): void => {
    setText(search);
    debounceValue(search);
  };

  if (dataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return (
    <main className={styles.main}>
      <Search
        onChange={(value): void => handleChange(value)}
        value={text}
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
