import H5AudioPlayer from 'react-h5-audio-player';
import { Comment as TComment } from 'common/types/types';
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

  const player = playerRef.current;
  const playerContainer = playerContainerRef.current;
  const progressBar = player?.progressBar.current;
  const duration = player?.audio.current?.duration;

  if (
    !player ||
    !playerContainer ||
    !progressBar ||
    !duration
  ) {
    return null;
  }

  const { x: progressBarLeft, width: progressBarWidth } =
    progressBar.getBoundingClientRect();
  const { x: playerContainerLeft, width: playerContainerWidth } =
    playerContainer.getBoundingClientRect();

  const offset = progressBarLeft - playerContainerLeft;

  const dimensions = {
    offset,
    progressBarWidth,
    playerContainerWidth,
  };

  const handleGoToTimestamp = (timestamp: number): (() => void) => {
    return (): void => {
      if (player.audio.current) {
        player.audio.current.currentTime = timestamp;
      }
    };
  };

  return (
    <div className={styles.timeline}>
      {comments.map((item) => (
        <TimelineItem
          key={item.id}
          comment={item}
          dimensions={dimensions}
          duration={duration}
          handleGoToTimestamp={handleGoToTimestamp}
        />
      ))}
    </div>
  );
};

export default CommentsTimeline;
