import { useAppSelector, useDispatch, useEffect, useParams } from 'hooks/hooks';
import { episode as episodeActions } from 'store/actions';
import { CreateCommentForm } from './common/components/components';
import { CommentCreatePayload } from 'common/types/types';
import { PageParams } from './common/types/types';
import CommentsList from './components/comments-list/comments-list';
import styles from './styles.module.scss';

const Episode: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();

  const { episode, comments, user } = useAppSelector(({ episode, auth }) => ({
    episode: episode.episode,
    comments: episode.comments,
    user: auth.user,
  }));

  useEffect(() => {
    dispatch(episodeActions.loadCommentsByEpisodeId(Number(id)));
    dispatch(episodeActions.loadEpisode(Number(id)));
  }, []);

  const handleCreateComment = (payload: CommentCreatePayload): void => {
    payload.episodeId = Number(id);
    //dispatch(commentActions.createComment(payload));
  };

  return (
    <main className={styles.root}>
      {episode ? (
        <div className={styles.episode}>
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
        </div>
      ) : (
        <h1 className={styles.notFound}>Oops. There is no such episode</h1>
      )}
      <CreateCommentForm
        user={user}
        onSubmit={handleCreateComment}
      />
      <div className={styles.commentsWrapper}>
        {
          comments.length
            ? <CommentsList comments={comments} />
            : <div>There&apos;s no comment yet.</div>
        }
      </div>
    </main>
  );
};

export default Episode;
