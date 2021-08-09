import H5AudioPlayer from 'react-h5-audio-player';
import {
  useAppSelector,
  useDispatch,
  useEffect,
  useParams,
  useState,
} from 'hooks/hooks';
import { episode as episodeActions } from 'store/actions';
import { CreateCommentForm, CommentsList } from './components/components';
import { Loader } from 'components/common/common';
import { DataStatus } from 'common/enums/enums';
import { CommentFormCreatePayload } from 'common/types/types';
import { PageParams } from './common/types/types';
import styles from './styles.module.scss';
import { Player } from 'components/common/common';

const Episode: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();
  const [player, setPlayer] = useState<H5AudioPlayer | null>(null);

  const { episode, comments, user, dataStatus } = useAppSelector(
    ({ episode, auth }) => ({
      dataStatus: episode.dataStatus,
      episode: episode.episode,
      comments: episode.comments,
      user: auth.user,
    }),
  );
  const hasUser = Boolean(user);

  useEffect(() => {
    dispatch(episodeActions.loadCommentsByEpisodeId(Number(id)));
    dispatch(episodeActions.loadEpisode(Number(id)));
  }, []);

  const handleCreateComment = (payload: CommentFormCreatePayload): void => {
    const timestamp =
      player && player.audio.current
        ? Math.round(player.audio.current.currentTime)
        : 0;
    dispatch(
      episodeActions.createComment({
        ...payload,
        timestamp,
      }),
    );
  };

  if (dataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return (
    <main className={styles.root}>
      {episode ? (
        <>
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
          {episode.record ? (
            <Player src={episode.record.fileUrl} setRef={setPlayer} />
          ) : null}
        </>
      ) : (
        <h1 className={styles.notFound}>Oops. There is no such episode</h1>
      )}
      <div className={styles.commentsWrapper}>
        {hasUser && <CreateCommentForm onSubmit={handleCreateComment} />}
        {comments.length ? (
          <CommentsList comments={comments} />
        ) : (
          <div>There&apos;s no comment yet.</div>
        )}
      </div>
    </main>
  );
};

export default Episode;
