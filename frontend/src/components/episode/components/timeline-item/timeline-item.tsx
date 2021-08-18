import { ImageWrapper } from 'components/common/common';
import { Comment } from 'common/types/types';
import { Dimensions } from '../../common/types/types';
import { getCommentOffset, getCommentColor, getLeftCommentBlock } from './helpers/helpers';
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'hooks/hooks';

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

  const [leftBlockComment, setLeftBlockComment] = useState(0);

  const commentTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (commentTextRef.current){
      setLeftBlockComment(getLeftCommentBlock(commentOffset, dimensions.playerContainerWidth, commentTextRef.current.clientWidth));
    }
  }, [commentTextRef.current]);

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
      <div style={{ left: `${leftBlockComment}px` }} className={styles.timelineItemContent}>
        <ImageWrapper
          width="30"
          height="30"
          loading="lazy"
          alt={String(comment.userId)}
          label={comment.user.nickname}
          className={styles.avatarWrapper}
          src={comment.user.image?.url}
        />
        <div className={styles.timelineItemInfo}>
          <div>{comment.user.nickname}</div>
          <div ref={commentTextRef} className={styles.commentText}>{comment.text}</div>
        </div>
      </div>
    </li>
  );
};

export default TimelineItem;
