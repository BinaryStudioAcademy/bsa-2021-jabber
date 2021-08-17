import { Comment as TComment } from 'common/types/types';
import TimelineItem from '../timeline-item/timeline-item';
import { Dimensions } from '../../common/types/types';
import styles from './styles.module.scss';

type Props = {
  comments: TComment[];
  onClick: (timeline: number) => void;
  dimensions: Dimensions;
  duration: number;
};

const CommentsTimeline: React.FC<Props> = ({
  comments,
  dimensions,
  duration,
  onClick: handleJumpToTimeLine,
}) => {
  return (
    <ul className={styles.timeline}>
      {comments.map((item) => (
        <TimelineItem
          key={item.id}
          comment={item}
          dimensions={dimensions}
          duration={duration}
          onClick={handleJumpToTimeLine}
        />
      ))}
    </ul>
  );
};

export default CommentsTimeline;
