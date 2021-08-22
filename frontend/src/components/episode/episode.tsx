import {
  useAppSelector,
  useDispatch,
  useEffect,
  useParams,
  useRef,
  useState,
} from 'hooks/hooks';
import {
  episode as episodeActions,
  configurateEpisode as configurateEpisodeActions,
} from 'store/actions';
import {
  Loader,
  CreateCommentForm,
  CommentsList,
  Player,
  Button,
  Link,
  ImageWrapper,
  ConfirmPopup,
} from 'components/common/common';
import { AppRoute, DataStatus, EpisodeStatus, UserRole } from 'common/enums/enums';
import { CommentFormCreatePayload } from 'common/types/types';
import { PlayerRef } from 'components/common/player/player';
import {
  getCurrentTime,
  getCommentsTimelineDimensions,
  getSortedShownotes,
} from './helpers/helpers';
import { PageParams } from './common/types/types';
import { ShownotesList, ComentsTimeline } from './components/components';
import styles from './styles.module.scss';
import { getAllowedClasses } from 'helpers/helpers';

const Episode: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();
  const playerRef = useRef<PlayerRef | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const { episode, comments, user, dataStatus, podcast, liveStream } = useAppSelector(
    ({ episode, auth, record }) => ({
      dataStatus: episode.dataStatus,
      episode: episode.episode,
      comments: episode.comments,
      user: auth.user,
      podcast: episode.podcast,
      liveStream: record.liveStream,
    }),
  );

  const [playerStatus, setPlayerStatus] = useState<DataStatus>(DataStatus.IDLE);

  const hasShownotes = Boolean(episode?.shownotes?.length);
  const hasUser = Boolean(user);
  const hasRecord = Boolean(episode?.record);
  const isStaging = episode?.status === EpisodeStatus.STAGING;
  const isOwner = user?.id === episode?.userId;
  const isMaster = user?.role === UserRole.MASTER;
  const isPlayerLoaded = playerStatus === DataStatus.FULFILLED;
  const isAllowDelete = isOwner || isMaster;

  useEffect(() => {
    dispatch(episodeActions.loadCommentsByEpisodeId(Number(id)));
    dispatch(episodeActions.loadEpisodePayload(Number(id)));

    return ((): void => {
      dispatch(episodeActions.leaveEpisode(id));
    });
  }, []);

  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState<boolean>(false);

  const handleJumpToTimeLine = (timeline: number): void => {
    playerRef.current?.setCurrentTime(timeline);
  };

  const handleCreateComment = (payload: CommentFormCreatePayload): void => {
    const timestamp = getCurrentTime(playerRef);
    dispatch(
      episodeActions.createComment({
        ...payload,
        timestamp,
      }),
    );
  };

  const handleDeleteEpisode = (): void => {
    dispatch(
      configurateEpisodeActions.deleteEpisode({
        episodeId: Number(id),
        podcastId: Number(episode?.podcastId),
      }),
    );
  };

  const handleCommentDelete = (commentId: number): void => {
    dispatch(episodeActions.deleteComment(commentId));
  };

  const handleShowPopup = (): void => {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
  };

  if (dataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  const commentsTimelineDimensions = getCommentsTimelineDimensions(
    playerRef,
    playerContainerRef,
  );
  const podcastDuration = playerRef.current?.getPodcastDuration();

  const sortedShownotes = getSortedShownotes(episode?.shownotes ?? []);

  return (
    <main className={styles.root}>
      {episode ? (
        <>
          <div className={styles.episodeWrapper}>
            <ImageWrapper
              src={episode.image?.url}
              alt={episode.name}
              label={episode.name}
              className={styles.imageWrapper}
            />
            {isStaging && isOwner && (
              <Button
                className={styles.btnStartLive}
                label="Start Live"
                href={`${AppRoute.EPISODES}/${id}${AppRoute.LIVE}`}
              />
            )}
            <div className={styles.episode}>
              <div className={styles.descriptionWrapper}>
                {isOwner && (
                  <Link
                    to={`${AppRoute.PODCASTS}/${episode.podcastId}${AppRoute.EPISODES_EDIT}/${episode.id}`}
                    className={styles.editLink}
                  >
                    <span className="visually-hidden">Edit episode</span>
                  </Link>
                )}
                {isAllowDelete && (
                  <>
                    <button
                      onClick={handleShowPopup}
                      className={styles.deleteButton}
                    >
                      <span className="visually-hidden">Delete episode</span>
                    </button>
                    <ConfirmPopup
                      title="Delete Episode"
                      description="You are going to delete the episode. Are you sure about this?"
                      isOpen={isConfirmPopupOpen}
                      onClose={handleShowPopup}
                      onConfirm={handleDeleteEpisode}
                    />
                  </>
                )}
                <Link
                  to={`${AppRoute.PODCASTS}/${episode?.podcastId}`}
                  className={styles.link}
                >
                  {podcast?.name}
                </Link>
                <h1 className={styles.title}>{episode.name}</h1>
                <p className={styles.description}>{episode.description}</p>
                <dl className={styles.episodeInfo}>
                  <div className={styles.infoBlock}>
                    <dt className={getAllowedClasses(styles.infoBlockTitle, styles.type)}>Type</dt>
                    <dd className={styles.infoBlockValue}>{episode.type}</dd>
                  </div>
                  <div className={styles.infoBlock}>
                    <dt className={getAllowedClasses(styles.infoBlockTitle, styles.status)}>Status</dt>
                    <dd className={styles.infoBlockValue}>{episode.status}</dd>
                  </div>
                </dl>
                {hasShownotes && (
                  <div className={styles.shownotesWrapper}>
                    <h3>Time navigation</h3>
                    <ShownotesList
                      shownotes={sortedShownotes}
                      onClick={handleJumpToTimeLine}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={styles.playerWrapper}>
              {isPlayerLoaded && commentsTimelineDimensions && podcastDuration && (
                <ComentsTimeline
                  comments={comments}
                  dimensions={commentsTimelineDimensions}
                  duration={podcastDuration}
                  onJumpToTimeLine={handleJumpToTimeLine}
                />
              )}
              {episode.record && (
                <div ref={playerContainerRef}>
                  <Player
                    srcObject={liveStream}
                    src={episode.record.fileUrl}
                    ref={playerRef}
                    onSetPlayerStatus={setPlayerStatus}
                  />
                </div>
              )}
            </div>
          </div>
          <section className={styles.commentsWrapper}>
            <h2 className={styles.commentsCounter}>
              Comments ({comments.length})
            </h2>
            {hasUser && <CreateCommentForm onSubmit={handleCreateComment} />}
            {comments.length ? (
              <CommentsList
                hasTimestamps={hasRecord}
                comments={comments}
                user={user}
                onTimeClick={handleJumpToTimeLine}
                onCommentDelete={handleCommentDelete}
              />
            ) : (
              <div>There&apos;s no comment yet.</div>
            )}
          </section>
        </>
      ) : (
        <h1 className={styles.notFound}>Oops. There is no such episode</h1>
      )}
    </main>
  );
};

export default Episode;
