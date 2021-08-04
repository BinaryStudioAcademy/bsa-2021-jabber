import { useAppSelector, useDispatch, useEffect, useParams } from 'hooks/hooks';
import { podcast as podcastActions } from 'store/actions';
import EpisodeTable from './episode-table/episode-table';
import { PageParams } from './common/types/types';
import styles from './styles.module.scss';

const Podcast: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();

  const { podcast } = useAppSelector(({ podcast }) => ({
    podcast: podcast.podcast,
  }));

  useEffect(() => {
    dispatch(podcastActions.loadPodcast(Number(id)));
  }, []);

  return (
    <main className={styles.podcast}>
      {podcast ? (
        <>
          <div className={styles.content}>
            <div className={styles.descriptionWrapper}>
              <h1 className={styles.title}>{podcast.name}</h1>
              <p className={styles.description}>{podcast.description}</p>
            </div>
            <p className={styles.logoWrapper}>
              <img
                src="#"
                width="280"
                height="280"
                loading="lazy"
                alt={podcast.name}
              />
            </p>
          </div>
          <EpisodeTable />
        </>
      ) : (
        <h1 className={styles.notFound}>Oops. There is no such podcast</h1>
      )}
    </main>
  );
};

export default Podcast;
