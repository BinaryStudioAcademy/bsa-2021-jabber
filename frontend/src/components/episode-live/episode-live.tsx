import { useAppSelector, useDispatch, useEffect, useParams } from 'hooks/hooks';
import {
  record as recordActions,
  episode as episodeActions,
} from 'store/actions';
import { RecordStatus } from 'common/enums/enums';
import { CommentFormCreatePayload } from 'common/types/types';
import {
  CreateCommentForm,
  CommentsList,
  ImageWrapper,
} from 'components/common/common';
import { ReactComponent as RecordIcon } from 'assets/img/player/record.svg';
import { ReactComponent as PauseIcon } from 'assets/img/player/pause.svg';
import { ReactComponent as PlayIcon } from 'assets/img/player/play.svg';
import { ReactComponent as StopIcon } from 'assets/img/player/stop.svg';
import styles from './styles.module.scss';

type PageParams = {
  id: string;
};

const EpisodeLive: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();

  const { recordStatus, user, episode, comments } = useAppSelector(
    ({ record, auth, episode }) => ({
      recordStatus: record.recordStatus,
      episode: episode.episode,
      comments: episode.comments,
      user: auth.user,
    }),
  );

  const isInactive = recordStatus === RecordStatus.INACTIVE;
  const isPaused = recordStatus === RecordStatus.PAUSED;
  const hasUser = Boolean(user);

  useEffect(() => {
    dispatch(episodeActions.loadCommentsByEpisodeId(Number(id)));
    dispatch(episodeActions.loadEpisodePayload(Number(id)));
  }, []);

  useEffect(() => {
    dispatch(recordActions.initRecord());
  }, []);

  const handleStart = (): void => {
    dispatch(recordActions.startRecord());
  };

  const handlePause = (): void => {
    dispatch(recordActions.pauseRecord());
  };

  const handleResume = (): void => {
    dispatch(recordActions.resumeRecord());
  };

  const handleStop = (): void => {
    dispatch(recordActions.stopRecord());
  };

  const handleCreateComment = (payload: CommentFormCreatePayload): void => {
    dispatch(episodeActions.createComment(payload));
  };

  return (
    <main className={styles.root}>
      <h1>Record podcast</h1>
      <div className={styles.content}>
        {episode && (
          <>
            <ImageWrapper
              src={episode.image?.url}
              loading="lazy"
              alt={episode.name}
              label={episode.name}
              className={styles.imageWrapper}
            />
            <div className={styles.descriptionWrapper}>
              <h1 className={styles.title}>{episode.name}</h1>
              <p className={styles.description}>{episode.description}</p>
            </div>
          </>
        )}
        <h3>Status: {recordStatus}</h3>
        <div className={styles.buttonRow}>
          <button
            className={styles.controlButton}
            onClick={handleStart}
            disabled={!isInactive}
          >
            <RecordIcon />
          </button>
          {!isPaused ? (
            <button
              className={styles.controlButton}
              onClick={handlePause}
              disabled={isInactive}
            >
              <PauseIcon />
            </button>
          ) : (
            <button
              className={styles.controlButton}
              onClick={handleResume}
            >
              <PlayIcon className={styles.playIcon} />
            </button>
          )}
          <button
            className={styles.controlButton}
            onClick={handleStop}
            disabled={isInactive}
          >
            <StopIcon />
          </button>
        </div>
      </div>
      <section className={styles.commentsWrapper}>
        <h2 className={styles.commentsCounter}>
          Comments ({comments.length})
        </h2>
        {hasUser && <CreateCommentForm onSubmit={handleCreateComment} />}
        {comments.length ? (
          <CommentsList comments={comments} />
        ) : (
          <div className={styles.placeholder}>There&apos;s no comment yet.</div>
        )}
      </section>
    </main>
  );
};

export default EpisodeLive;
