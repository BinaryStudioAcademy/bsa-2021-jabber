import { useAppSelector, useDispatch, useEffect, useParams } from 'hooks/hooks';
import { episode as episodeActions } from 'store/actions';
import { PageParams } from './common/types/types';
import CommentsList from './components/comments-list/comments-list';
import { comment as commentActions } from 'store/actions';
import styles from './styles.module.scss';

const Episode: React.FC = () => {
  const dispatch = useDispatch();
  const { episodeId } = useParams<PageParams>();

  const { episode, comments } = useAppSelector(({ episode, comments }) => ({
    episode: episode.episode,
    comments: comments.comments,
  }));

  useEffect(() => {
    dispatch(episodeActions.loadEpisode(Number(episodeId)));
    dispatch(commentActions.loadComments());
  }, []);

  return (
    <>
      <main className={styles.episode}>
        {episode ? (
          <>
            <div className={styles.descriptionWrapper}>
              <h1 className={styles.title}>{episode.name}</h1>
              <p className={styles.description}>{episode.description}</p>
            </div>
            <p className={styles.logoWrapper}>
              <img
                src="#"
                width="280"
                height="280"
                loading="lazy"
                alt={episode.name}
              />
            </p>
          </>
        ) : (
          <h1 className={styles.notFound}>Oops. There is no such episode</h1>
        )}
      </main>
      <CommentsList comments={comments}/>
    </>
  );
};

export default Episode;
