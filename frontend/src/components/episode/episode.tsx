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
} from 'components/common/common';
import { AppRoute, DataStatus, EpisodeStatus } from 'common/enums/enums';
import { CommentFormCreatePayload } from 'common/types/types';
import { PlayerRef } from 'components/common/player/player';
import { getCurrentTime } from './helpers/helpers';
import { PageParams } from './common/types/types';
import { ShownotesList, ComentsTimeline } from './components/components';
import styles from './styles.module.scss';

const Episode: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();
  const playerRef = useRef<PlayerRef | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const { episode, comments, user, dataStatus, podcast } = useAppSelector(
    ({ episode, auth }) => ({
      dataStatus: episode.dataStatus,
      episode: episode.episode,
      comments: episode.comments,
      user: auth.user,
      podcast: episode.podcast,
    }),
  );

  const [playerStatus, setPlayerStatus] = useState<DataStatus>(DataStatus.IDLE);

  const hasShownotes = Boolean(episode?.shownotes?.length);
  const hasUser = Boolean(user);
  const isStaging = episode?.status === EpisodeStatus.STAGING;
  const isOwner = user?.id === episode?.userId;
  const isPlayerLoaded = playerStatus === DataStatus.FULFILLED;

  useEffect(() => {
    dispatch(episodeActions.loadCommentsByEpisodeId(Number(id)));
    dispatch(episodeActions.loadEpisodePayload(Number(id)));
  }, []);

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

  if (dataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

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
            <div className={styles.episode}>
              {isStaging && isOwner && (
                <Button
                  className={styles.btnStartLive}
                  label="Start Live"
                  href={`${AppRoute.EPISODES}/${id}${AppRoute.LIVE}`}
                />
              )}
              <div className={styles.descriptionWrapper}>
                {isOwner && (
                  <>
                    <Link
                      to={`${AppRoute.PODCASTS}/${episode.podcastId}${AppRoute.EPISODES_EDIT}/${episode.id}`}
                      className={styles.editLink}
                    >
                      <span className="visually-hidden">Edit episode</span>
                    </Link>
                    <button
                      onClick={handleDeleteEpisode}
                      className={styles.deleteButton}
                    >
                      <span className="visually-hidden">Delete episode</span>
                    </button>
                  </>
                )}
                <Link
                  to={`${AppRoute.PODCASTS}/${episode?.podcastId}`}
                  className={styles.link}
                >
                  {podcast?.name}
                </Link>
                <h1 className={styles.title}>{episode.name}</h1>
                <dl className={styles.episodeInfo}>
                  <div className={styles.infoBlock}>
                    <dt className={styles.infoBlockTitle}>Type: </dt>
                    <dd className={styles.infoBlockValue}>{episode.type}</dd>
                  </div>
                  <div className={styles.infoBlock}>
                    <dt className={styles.infoBlockTitle}>Status:</dt>
                    <dd className={styles.infoBlockValue}>{episode.status}</dd>
                  </div>
                </dl>
                <p className={styles.description}>{episode.description}</p>
                {hasShownotes && (
                  <div className={styles.shownotesWrapper}>
                    <h3>Time navigation</h3>
                    <ShownotesList
                      shownotes={episode.shownotes}
                      onClick={handleJumpToTimeLine}
                    />
                  </div>
                )}
              </div>
            </div>
            {episode.record && (
              <div ref={playerContainerRef}>
                <Player src={episode.record.fileUrl} ref={playerRef} setPlayerStatus={setPlayerStatus}/>
                {isPlayerLoaded && playerRef.current && <ComentsTimeline comments={comments} playerRef={playerRef.current.getRef()} playerContainerRef={playerContainerRef}/>}
              </div>
            )}
          </div>
          <section className={styles.commentsWrapper}>
            <h2 className={styles.commentsCounter}>
              Comments ({comments.length})
            </h2>
            {hasUser && <CreateCommentForm onSubmit={handleCreateComment} />}
            {comments.length ? (
              <CommentsList
                comments={comments}
                onClick={handleJumpToTimeLine}
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
