import H5AudioPlayer from 'react-h5-audio-player';
import { useAppSelector } from 'hooks/hooks';
import { DataStatus } from 'common/enums/enums';
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
  const { playerStatus } = useAppSelector(({ player }) => ({
    playerStatus: player.dataStatus,
  }));

  const player = playerRef.current;
  const playerContainer = playerContainerRef.current;
  const progressBar = player?.progressBar.current;
  const duration = player?.audio.current?.duration;

  if (
    playerStatus !== DataStatus.FULFILLED ||
    !player ||
    !playerContainer ||
    !progressBar ||
    !duration
  ) {
    return null;
  }

  const { x: progressBarLeft, width: progressBarWidth } =
    progressBar.getBoundingClientRect();
  const { x: playerContainerLeft, width: playerContainerWidth } = playerContainer.getBoundingClientRect();

  const offset = progressBarLeft - playerContainerLeft;

  const props = {
    dimensions: {
      offset,
      progressBarWidth,
      playerContainerWidth,
    },
    duration,
  };

  return (
    <div className={styles.timeline}>
      {comments.map((item) => (
        <TimelineItem
          key={item.id}
          comment={item}
          {...props}
          handleClick={(): void => {
            if (player.audio.current) {
              player.audio.current.currentTime = item.timestamp;
            }
          }}
        />
      ))}
    </div>
  );
};

export default CommentsTimeline;
