import { useAppSelector, useDispatch, useEffect, useParams } from 'hooks/hooks';
import { podcast as podcastActions } from 'store/actions';
import { PageParams } from './common/types/types';
import styles from './styles.module.scss';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';

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
          <Link to={`${AppRoute.PODCASTS}/${id}${AppRoute.EPISODE_EDIT}`} >
            Add Episode
          </Link>
        </>
      ) : (
        <h1 className={styles.notFound}>Oops. There is no such podcast</h1>
      )}
    </main>
  );
};

export default Podcast;
