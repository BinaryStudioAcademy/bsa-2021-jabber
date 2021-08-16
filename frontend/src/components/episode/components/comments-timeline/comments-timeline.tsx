import H5AudioPlayer from 'react-h5-audio-player';
import { DataStatus } from 'common/enums/enums';
import { Comment as TComment } from 'common/types/types';
import { useAppSelector } from 'hooks/hooks';
import TimelineItem from '../timeline-item/timeline-item';
import styles from './styles.module.scss';

type Props = {
  comments: TComment[];
  playerRef: React.MutableRefObject<H5AudioPlayer | null>;
  playerContainerRef: React.RefObject<HTMLDivElement>;
};

const CommentsTimeline: React.FC<Props> = ({
  comments,
  playerRef,
  playerContainerRef,
}) => {
  const { playerStatus } = useAppSelector(({ player }) => ({
    playerStatus: player.dataStatus,
  }));

  let duration = 0;
  const player = playerRef.current;
  const playerContainer = playerContainerRef.current;
  const progressBar = player?.progressBar.current;

  if (
    playerStatus !== DataStatus.FULFILLED ||
    !player ||
    !playerContainer ||
    !progressBar
  ) {
    return null;
  }
  duration = player.audio.current?.duration || 0;

  // eslint-disable-next-line no-console
  console.log(progressBar.getBoundingClientRect());
  // eslint-disable-next-line no-console
  console.log(playerContainer.getBoundingClientRect());
  // eslint-disable-next-line no-console
  console.log(duration);

  return (
    <div className={styles.timeline}>
      {comments.map((item) => (
        <TimelineItem key={item.id} comment={item} />
      ))}
    </div>
  );
};

export default CommentsTimeline;
