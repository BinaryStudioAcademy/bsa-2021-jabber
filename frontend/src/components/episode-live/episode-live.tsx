import { useAppSelector, useDispatch, useEffect, useParams } from 'hooks/hooks';
import {
  record as recordActions,
  episode as episodeActions,
} from 'store/actions';
import { RecordStatus, DataStatus, EpisodeStatus } from 'common/enums/enums';
import { CommentFormCreatePayload, Episode } from 'common/types/types';
import {
  CreateCommentForm,
  CommentsList,
  ImageWrapper,
} from 'components/common/common';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type PageParams = {
  id: string;
};

const EpisodeLive: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();

  const { recordStatus, user, episode, comments, recordInitStatus } = useAppSelector(
    ({ record, auth, episode }) => ({
      recordStatus: record.recordStatus,
      recordInitStatus: record.recordInitStatus,
      episode: episode.episode,
      comments: episode.comments,
      user: auth.user,
    }),
  );

  const isRecordAllowed = recordInitStatus === DataStatus.FULFILLED;
  const isInactive = recordStatus === RecordStatus.INACTIVE;
  const isPaused = recordStatus === RecordStatus.PAUSED;
  const hasUser = Boolean(user);

  useEffect(() => {
    dispatch(episodeActions.loadCommentsByEpisodeId(Number(id)));
    dispatch(episodeActions.loadEpisodePayload(Number(id)));

    return (): void => {
      dispatch(episodeActions.changeEpisodeStatus({
        ...episode as Episode,
        status: EpisodeStatus.STAGING,
      }));
    };
  }, []);

  useEffect(() => {
    dispatch(recordActions.initRecord());
  }, []);

  const handleStart = (): void => {
    isRecordAllowed
      ? dispatch(recordActions.startRecord(id))
      : dispatch(recordActions.initRecord());
  };

  const handlePause = (): void => {
    dispatch(recordActions.pauseRecord());
  };

  const handleResume = (): void => {
    dispatch(recordActions.resumeRecord());
  };

  const handleStop = (): void => {
    dispatch(recordActions.stopRecord(id));
  };

  const handleCreateComment = (payload: CommentFormCreatePayload): void => {
    dispatch(episodeActions.createComment(payload));
  };

  const handleCommentDelete = (commentId: number): void => {
    dispatch(episodeActions.deleteComment(commentId));
  };

  const handleCommentLikeToggle = (commentId: number): void => {
    dispatch(episodeActions.toggleCommentLike(commentId));
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
        <div className={styles.actionWrapper}>
          <h3>Status: {recordStatus}</h3>
          <div className={styles.buttonRow}>
            <button
              className={getAllowedClasses(
                styles.controlButton,
                styles.recordButton,
              )}
              onClick={handleStart}
              disabled={!isInactive}
            />
            {!isPaused ? (
              <button
                className={getAllowedClasses(
                  styles.controlButton,
                  styles.pauseButton,
                )}
                onClick={handlePause}
                disabled={isInactive}
              />
            ) : (
              <button
                className={getAllowedClasses(
                  styles.controlButton,
                  styles.resumeButton,
                )}
                onClick={handleResume}
              />
            )}
            <button
              className={getAllowedClasses(
                styles.controlButton,
                styles.stopButton,
              )}
              onClick={handleStop}
              disabled={isInactive}
            />
          </div>
        </div>
      </div>
      <section className={styles.commentsWrapper}>
        <h2 className={styles.commentsCounter}>Comments ({comments.length})</h2>
        {hasUser && <CreateCommentForm onSubmit={handleCreateComment} />}
        {comments.length ? (
          <CommentsList
            comments={comments}
            user={user}
            onCommentDelete={handleCommentDelete}
            onToggleCommentLike={handleCommentLikeToggle}
          />
        ) : (
          <div className={styles.placeholder}>There&apos;s no comment yet.</div>
        )}
      </section>
    </main>
  );
};

export default EpisodeLive;
