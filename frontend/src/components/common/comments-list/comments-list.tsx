import { CommentItem } from 'components/common/common';
import { Comment } from 'common/types/types';
import styles from './styles.module.scss';

type Props = {
  comments: Comment[];
  onClick?: (payload: number) => void;
};

const CommentsList: React.FC<Props> = ({ comments,onClick }) => {
  return (
    <ul className={styles.list}>
      {comments.map((item) => (
        <CommentItem
          onClick={onClick}
          comment={item}
          key={item.id} />
      ))}
    </ul>
  );
};

export default CommentsList;
