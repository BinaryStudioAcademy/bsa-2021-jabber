import { DataStatus } from 'common/enums/enums';
import { Loader } from 'components/common/common';
import { useAppSelector, useDispatch, useEffect, useState } from 'hooks/hooks';
import { homepage as homepageActions } from 'store/actions';
import { PodcastList, Search } from './components/components';
import { Podcast, SearchPayload } from 'common/types/types';
import styles from './styles.module.scss';

const Homepage: React.FC = () => {
  const { podcasts, dataStatus } = useAppSelector(({ homepage }) => ({
    podcasts: homepage.podcasts,
    dataStatus: homepage.dataStatus,
  }));
  const dispatch = useDispatch();
  const hasPodcasts = Boolean(podcasts.length);

  const [filter, setFilter] = useState<Array<Podcast>>(podcasts);

  useEffect(() => {
    dispatch(homepageActions.loadPodcasts());
  }, []);

  const handleChange = (searchValue: SearchPayload): void => {
    const { search } = searchValue;
    const filtered = filterPodcasts(search);
    search === '' ? setFilter(podcasts) : setFilter(filtered);
  };

  const filterPodcasts = (search: string): Array<Podcast> => {
    const searchText = search.toLowerCase().split(' ').join('');
    return podcasts
      .filter((it) => it.name.split(' ')
        .join('')
        .toLowerCase()
        .includes(searchText));
  };

  if (dataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return (
    <main className={styles.main}>
      <Search
        onChange={(value): void => handleChange(value)}
      />
      <h2 className={styles.title}>All podcasts</h2>
      { hasPodcasts ?
        <PodcastList podcasts={filter}/> :
        <span className={styles.oopsMessage}>Oops! There&apos;s nothing here</span>
      }
    </main>
  );
};

export default Homepage;
