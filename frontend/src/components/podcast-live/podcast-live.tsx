import { useAppSelector, useDispatch, useEffect, useParams } from 'hooks/hooks';
import { record as recordActions, episode as episodeActions } from 'store/actions';
import { RecordStatus, ButtonColor } from 'common/enums/enums';
import Button from 'components/common/button/button';
import styles from './styles.module.scss';
import { CreateCommentForm, CommentsList } from 'components/common/common';
import { CommentFormCreatePayload } from 'common/types/types';
import defaultImage from 'assets/img/default-podcast-image.jpeg';

type PageParams = {
  id: string;
};

const PodcastLive: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();

  const { recordStatus, user, episode, comments } = useAppSelector(({ record, auth, episode }) => ({
    recordStatus: record.recordStatus,
    episode: episode.episode,
    comments: episode.comments,
    user: auth.user,
  }));
  const isPaused = recordStatus === RecordStatus.PAUSED;
  const hasUser = Boolean(user);

  useEffect(() => {
    dispatch(episodeActions.loadCommentsByEpisodeId(Number(id)));
    dispatch(episodeActions.loadEpisode(Number(id)));
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
    alert(payload.text);
  };

  return (
    <main className={styles.root}>
      <h1>Record podcast</h1>
      {episode &&
        <div className={styles.content}>
          <div className={styles.descriptionWrapper}>
            <h1 className={styles.title}>{episode.name}</h1>
            <p className={styles.description}>{episode.description}</p>
            <p className={styles.type}>Type: {episode.type}</p>
          </div>
          <p className={styles.imageWrapper}>
            <img
              src={episode.image?.url ?? defaultImage}
              width="280"
              height="280"
              loading="lazy"
              alt={episode.name}
            />
          </p>
        </div>
      }
      <h3>
        Status:
        {' '}
        {recordStatus}
      </h3>
      <div className={styles.buttonRow}>
        <Button
          label="&#9210;"
          buttonColor={ButtonColor.LIGHT_NAVY}
          onClick={handleStart} />
        {!isPaused
          ? <Button
            label="&#9208;"
            buttonColor={ButtonColor.LIGHT_NAVY}
            onClick={handlePause} />
          : <Button
            label="&#9654;"
            buttonColor={ButtonColor.LIGHT_NAVY}
            onClick={handleResume} />}
        <Button
          label="&#9209;"
          buttonColor={ButtonColor.LIGHT_NAVY}
          onClick={handleStop} />
      </div>
      <div className={styles.commentsWrapper}>
        {hasUser && <CreateCommentForm onSubmit={handleCreateComment} />}
        <div className={styles.commentsCounter}>{comments.length} comments</div>
        {comments.length ? (
          <CommentsList comments={comments} />
        ) : (
          <div className={styles.placeholder}>There&apos;s no comment yet.</div>
        )}
      </div>
    </main>
  );
};

export default PodcastLive;
