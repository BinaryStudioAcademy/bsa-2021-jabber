import { useAppSelector, useDispatch, useEffect, useHistory, useParams, useRef, useState } from 'hooks/hooks';
import {
  configurateEpisode as configurateEpisodeActions,
  episode as episodeActions,
  record as recordActions,
} from 'store/actions';
import {
  Button,
  CommentsList,
  ConfirmPopup,
  CreateCommentForm,
  ImageWrapper,
  Link,
  Loader,
  Player,
} from 'components/common/common';
import { AppRoute, DataStatus, EpisodeStatus, UserRole } from 'common/enums/enums';
import { CommentFormCreatePayload } from 'common/types/types';
import { PlayerRef } from 'components/common/player/player';
import { getCommentsTimelineDimensions, getCurrentTime, getSortedComments, getSortedShownotes } from './helpers/helpers';
import { PageParams } from './common/types/types';
import { AddToPlaylistPopup, ComentsTimeline, ShownotesList } from './components/components';
import styles from './styles.module.scss';
import { getAllowedClasses } from 'helpers/helpers';

const Episode: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();
  const playerRef = useRef<PlayerRef | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const {
    episode,
    comments,
    user,
    dataStatus,
    podcast,
    liveStream,
    favouriteDataStatus,
    isFavourite,
    playlists,
    playlistsDataStatus,
    commentDataStatus,
    loadCommentsDataStatus,
  } =
    useAppSelector(({ episode, auth, record }) => ({
      dataStatus: episode.dataStatus,
      episode: episode.episode,
      comments: episode.comments,
      user: auth.user,
      podcast: episode.podcast,
      liveStream: record.liveStream,
      favouriteDataStatus: episode.favouriteDataStatus,
      isFavourite: episode.isFavourite,
      playlists: episode.playlists,
      playlistsDataStatus: episode.playlistsDataStatus,
      commentDataStatus: episode.commentDataStatus,
      loadCommentsDataStatus: episode.loadCommentsDataStatus,
    }));

  const [playerStatus, setPlayerStatus] = useState<DataStatus>(DataStatus.IDLE);
  const history = useHistory();

  const hasShownotes = Boolean(episode?.shownotes?.length);
  const hasUser = Boolean(user);
  const hasRecord = Boolean(episode?.record);
  const isStaging = episode?.status === EpisodeStatus.STAGING;
  const isOwner = user?.id === episode?.userId;
  const isMaster = user?.role === UserRole.MASTER;
  const isPlayerLoaded = playerStatus === DataStatus.FULFILLED;
  const isAllowDelete = isOwner || isMaster;
  const isPlayerShow = Boolean(episode?.record?.fileUrl) || Boolean(liveStream);
  const isLoading = dataStatus === DataStatus.PENDING || favouriteDataStatus === DataStatus.PENDING;
  const isAddToPLaylistsShow = playlistsDataStatus === DataStatus.FULFILLED && episode?.status === EpisodeStatus.PUBLISHED;
  const isDisabledReactionComment = commentDataStatus === DataStatus.PENDING;
  const isDisabledCommentForm = loadCommentsDataStatus === DataStatus.PENDING;

  useEffect(() => {
    dispatch(episodeActions.loadCommentsByEpisodeId(Number(id)));
    dispatch(episodeActions.loadEpisodePayload(Number(id)));
    dispatch(episodeActions.checkEpisodeIsFavorite(Number(id)));
    dispatch(episodeActions.loadPlaylists());

    return (): void => {
      dispatch(episodeActions.leaveEpisode(id));
      dispatch(recordActions.resetState());
    };
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

  const handleCommentLikeToggle = (commentId: number): void => {
    hasUser
      ? !isDisabledReactionComment && dispatch(episodeActions.toggleCommentLike(commentId))
      : history.push(AppRoute.SIGN_IN);
  };

  const handleShowPopup = (): void => {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
  };

  const handleToggleFavorite = (): void => {
    dispatch(episodeActions.toggleFavourite());
  };

  const handleAddToPlaylist = (id: number): void => {
    dispatch(episodeActions.addEpisodeToPlaylist(id));
  };

  if (isLoading) {
    return <Loader />;
  }

  const commentsTimelineDimensions = getCommentsTimelineDimensions(
    playerRef,
    playerContainerRef,
  );
  const podcastDuration = playerRef.current?.getPodcastDuration();

  const sortedShownotes = getSortedShownotes(episode?.shownotes ?? []);
  const sortedComments = getSortedComments(comments);

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
                className={isPlayerShow
                  ? getAllowedClasses(
                    styles.btnStartLive,
                    styles.btnWithPlayer,
                  )
                  : styles.btnStartLive}
                label="Start Live"
                href={`${AppRoute.EPISODES}/${id}${AppRoute.LIVE}`}
              />
            )}
            {isAddToPLaylistsShow && (
              <AddToPlaylistPopup
                playlists={playlists}
                handleAddToPlaylist={handleAddToPlaylist}
                triggerClassName={isPlayerShow
                  ? getAllowedClasses(
                    styles.btnStartLive,
                    styles.btnWithPlayer,
                    styles.playlistTrigger,
                  )
                  : styles.btnStartLive}
              />)}
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
              {hasUser && !isOwner && (
                <button
                  onClick={handleToggleFavorite}
                  className={getAllowedClasses(
                    styles.favouriteButton,
                    isFavourite && styles.favouriteActive,
                    isMaster && styles.favoriteMaster,
                  )}
                  title={isFavourite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <span className="visually-hidden">Favorite</span>
                </button>
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
                  <dt
                    className={getAllowedClasses(
                      styles.infoBlockTitle,
                      styles.type,
                    )}
                  >
                    Type
                  </dt>
                  <dd className={styles.infoBlockValue}>{episode.type}</dd>
                </div>
                <div className={styles.infoBlock}>
                  <dt
                    className={getAllowedClasses(
                      styles.infoBlockTitle,
                      styles.status,
                    )}
                  >
                    Status
                  </dt>
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
            <div className={styles.playerWrapper}>
              {isPlayerLoaded &&
                commentsTimelineDimensions &&
                podcastDuration && (
                <ComentsTimeline
                  comments={comments}
                  dimensions={commentsTimelineDimensions}
                  duration={podcastDuration}
                  onJumpToTimeLine={handleJumpToTimeLine}
                />
              )}
              {isPlayerShow && (
                <div ref={playerContainerRef}>
                  <Player
                    srcObject={liveStream}
                    src={episode?.record?.fileUrl ?? ''}
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
            {hasUser && <CreateCommentForm onSubmit={handleCreateComment} isDisabled={isDisabledCommentForm} />}
            {comments.length ? (
              <CommentsList
                hasTimestamps={hasRecord}
                comments={sortedComments}
                user={user}
                onTimeClick={handleJumpToTimeLine}
                onCommentDelete={handleCommentDelete}
                onToggleCommentLike={handleCommentLikeToggle}
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
