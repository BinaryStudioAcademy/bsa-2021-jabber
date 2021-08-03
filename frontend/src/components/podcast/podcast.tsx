import { useAppSelector, useDispatch, useEffect, useParams } from 'hooks/hooks';
import { podcast as podcastActions } from 'store/actions';
import { PageParams } from './common/types/types';
import styles from './styles.module.scss';
import { Button } from '../common/common';
import { AppRoute } from '../../common/enums/app/app-route.enum';

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
            <p className={styles.createdWrapper}>{podcast.createdAt}</p>
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
        </>
      ) : (

        <h1 className={styles.notFound}>Oops. There is no such podcast <Button href={AppRoute.SIGN_IN} label={'123'} /></h1>
      )}
    </main>
  );
};

export default Podcast;
