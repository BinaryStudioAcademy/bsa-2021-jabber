import { ImageWrapper } from 'components/common/common';
import { Comment as TComment } from 'common/types/types';
import { Dimensions } from '../../common/types/types';
import { getCommentOffset } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  comment: TComment;
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

  const handleGoToItemTimestamp = (): void => {
    onJumpToTimeLine(comment.timestamp);
  };

  return (
    <li className={styles.timelineItem} style={{ left: `${commentOffset}%` }}>
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
