import { Comment as TComment } from 'common/types/types';
import styles from './styles.module.scss';
import Comment from '../comment/comment';

type Props = {
  comments: TComment[];
};

const CommentsList: React.FC<Props> = ({ comments }) => {
  return (
    <ul className={styles.list}>
      {comments.map((item) => (
        <Comment comment={item} key={item.id} />
      ))}
    </ul>
  );
};

export default CommentsList;
