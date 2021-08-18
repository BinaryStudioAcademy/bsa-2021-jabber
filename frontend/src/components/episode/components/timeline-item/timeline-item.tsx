import { ImageWrapper } from 'components/common/common';
import { Comment } from 'common/types/types';
import { Dimensions } from '../../common/types/types';
import { getCommentOffset, getCommentColor } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  comment: Comment;
  dimensions: Dimensions;
  duration: number;
  onJumpToTimeLine: (timeline: number) => void;
};

const TimelineItem: React.FC<Props> = ({
  comment,
  dimensions,
  duration,
  onJumpToTimeLine,
}) => {
  const commentOffset = getCommentOffset(
    duration,
    comment.timestamp,
    dimensions,
  );
  const commentColor = getCommentColor();

  const handleGoToItemTimestamp = (): void => {
    onJumpToTimeLine(comment.timestamp);
  };

  return (
    <li
      className={styles.timelineItem}
      style={{
        left: `${commentOffset}%`,
        backgroundColor: commentColor,
      }}
    >
      <button
        onClick={handleGoToItemTimestamp}
        className={styles.timelineItemBtn}
      />
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
    </li>
  );
};

export default TimelineItem;
