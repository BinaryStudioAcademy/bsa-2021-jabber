import {
  useAppSelector,
  useDispatch,
  useEffect,
  useParams,
  useRef,
} from 'hooks/hooks';
import { episode as episodeActions } from 'store/actions';
import { Loader, CreateCommentForm, CommentsList, Player, Button } from 'components/common/common';
import { AppRoute, DataStatus, EpisodeStatus } from 'common/enums/enums';
import { CommentFormCreatePayload } from 'common/types/types';
import { PlayerRef } from 'components/common/player/player';
import { getCurrentTime } from './helpers/helpers';
import { PageParams } from './common/types/types';
import defaultImage from 'assets/img/default-podcast-image.jpeg';
import { ShownotesList } from './components/components';
import styles from './styles.module.scss';

const Episode: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();
  const playerRef = useRef<PlayerRef | null>(null);

  const { episode, comments, user, dataStatus } = useAppSelector(
    ({ episode, auth }) => ({
      dataStatus: episode.dataStatus,
      episode: episode.episode,
      comments: episode.comments,
      user: auth.user,
    }),
  );

  const hasShownotes = Boolean(episode?.shownotes?.length);
  const hasUser = Boolean(user);
  const isStaging = episode?.status === EpisodeStatus.STAGING;
  const isOwner = user?.id === episode?.userId;

  useEffect(() => {
    dispatch(episodeActions.loadCommentsByEpisodeId(Number(id)));
    dispatch(episodeActions.loadEpisode(Number(id)));
  }, []);

  const handleJumpToTimeLine = (timeline:number): void => {
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
              <p className={styles.type}>Type: {episode.type}</p>
              <p className={styles.type}>Status: {episode.status}</p>
              {hasShownotes && (
                <div className={styles.shownotesWrapper}>
                  <h3>Time navigation</h3>
                  <ShownotesList shownotes={episode.shownotes} onClick={handleJumpToTimeLine} />
                </div>
              )}
              {
                isStaging && isOwner && <Button className={styles.btnStartLive} label="Start Live" href={`${AppRoute.EPISODES}/${id}${AppRoute.LIVE}`} />
              }
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.wrapper}>
                <p className={styles.imageWrapper}>
                  <img
                    src={episode.image?.url ?? defaultImage}
                    className={styles.episodeImage}
                    width="280"
                    height="280"
                    loading="lazy"
                    alt={episode.name}
                  />
                </p>
              </div>
            </div>
          </div>
          {episode.record && (
            <Player src={episode.record.fileUrl} ref={playerRef} />
          )}
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
    </main >
  );
};

export default Episode;
