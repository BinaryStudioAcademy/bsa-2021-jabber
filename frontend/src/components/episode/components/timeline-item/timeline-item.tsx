import { ImageWrapper } from 'components/common/common';
import { Comment as TComment } from 'common/types/types';
import styles from './styles.module.scss';

type Props = {
  comment: TComment;
  dimensions: {
    offset: number;
    progressBarWidth: number;
    playerContainerWidth: number;
  };
  duration: number;
  handleClick: () => void;
};

const TimelineItem: React.FC<Props> = ({
  comment,
  dimensions,
  duration,
  handleClick,
}) => {
  const commentOffset =
    ((dimensions.offset +
      (comment.timestamp / duration) * dimensions.progressBarWidth) /
      dimensions.playerContainerWidth) *
    100;

  return (
    <div
      className={styles.timelineItem}
      style={{ left: `${commentOffset}%` }}
      onClick={handleClick}
    >
      <div className={styles.timelineItemContent}>
        <ImageWrapper
          width="30"
          height="30"
          loading="lazy"
          alt={String(comment.userId)}
          label={comment.user.nickname}
          className={styles.avatarWrapper}
        />
        <div className={styles.timelineItemInfo}>
          <div>{comment.user.nickname}</div>
          <div>{comment.text}</div>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
