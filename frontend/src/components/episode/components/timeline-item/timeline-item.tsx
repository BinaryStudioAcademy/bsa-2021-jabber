import { Comment as TComment } from 'common/types/types';
import styles from './styles.module.scss';

type Props = {
  comment: TComment;
};

const TimelineItem: React.FC<Props> = ({ comment }) => {
  return (
    <div className={styles.timelineItem} style={{ left: `calc(${comment.timestamp}%)` }}>
      {comment.timestamp}
    </div>
  );
};

export default TimelineItem;
