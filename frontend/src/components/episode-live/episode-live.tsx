import { useAppSelector, useDispatch, useEffect, useParams } from 'hooks/hooks';
import { record as recordActions } from 'store/actions';
import { DataStatus, EpisodeStatus, RecordStatus } from 'common/enums/enums';
import { CommentFormCreatePayload } from 'common/types/types';
import { Button, CommentsList, CreateCommentForm, ImageWrapper } from 'components/common/common';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type PageParams = {
  id: string;
};

const EpisodeLive: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();

  const {
    recordStatus,
    user,
    episode,
    comments,
    recordInitStatus,
    commentDataStatus,
    loadCommentsDataStatus,
  } = useAppSelector(
    ({ record, auth }) => ({
      recordStatus: record.recordStatus,
      recordInitStatus: record.recordInitStatus,
      episode: record.episode,
      comments: record.comments,
      user: auth.user,
      commentDataStatus: record.commentDataStatus,
      loadCommentsDataStatus: record.loadCommentsDataStatus,
    }),
  );

  const isRecordAllowed = recordInitStatus === DataStatus.FULFILLED;
  const isInactive = recordStatus === RecordStatus.INACTIVE;
  const isPaused = recordStatus === RecordStatus.PAUSED;
  const hasUser = Boolean(user);
  const isOwner = user?.id === episode?.userId;
  const isEpisodeStatusLive = episode?.status === EpisodeStatus.LIVE;
  const isDisabledStartRecord = !isEpisodeStatusLive || !isInactive;
  const isDisabledReactionComment = commentDataStatus === DataStatus.PENDING;
  const isDisabledCommentForm = loadCommentsDataStatus === DataStatus.PENDING;

  useEffect(() => {
    dispatch(recordActions.loadCommentsByEpisodeId(Number(id)));
    dispatch(recordActions.loadEpisodePayload(Number(id)));

    return (): void => {
      dispatch(recordActions.leaveEpisode(id));
    };
  }, []);

  useEffect(() => {
    dispatch(recordActions.initRecord());
  }, []);

  const handleClickStartLive = (): void => {
    if (episode && isOwner) {
      dispatch(recordActions.changeEpisodeStatus({
        ...episode,
        status: EpisodeStatus.LIVE,
      }));
    }
  };

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
    dispatch(recordActions.createComment(payload));
  };

  const handleCommentDelete = (commentId: number): void => {
    dispatch(recordActions.deleteComment(commentId));
  };

  const handleCommentLikeToggle = (commentId: number): void => {
    !isDisabledReactionComment && dispatch(recordActions.toggleCommentLike(commentId));
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
            <Button
              className={ styles.btnChangeStatus }
              label="Go to live"
              onClick={handleClickStartLive}
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
              disabled={isDisabledStartRecord}
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
      {isEpisodeStatusLive && <section className={styles.commentsWrapper}>
        <h2 className={styles.commentsCounter}>Comments ({comments.length})</h2>
        {hasUser && <CreateCommentForm onSubmit={handleCreateComment} isDisabled={isDisabledCommentForm}/>}
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
      </section>}
    </main>
  );
};

export default EpisodeLive;
