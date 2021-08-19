import { CommentItem } from 'components/common/common';
import { Comment } from 'common/types/types';
import styles from './styles.module.scss';

type Props = {
  hasTimestamps?: boolean;
  comments: Comment[];
  onClick?: (payload: number) => void;
};

const CommentsList: React.FC<Props> = ({ comments, onClick, hasTimestamps }) => {
  return (
    <ul className={styles.list}>
      {comments.map((item) => (
        <CommentItem
          hasTimestamps={hasTimestamps}
          onClick={onClick}
          comment={item}
          key={item.id} />
      ))}
    </ul>
  );
};

export default CommentsList;
