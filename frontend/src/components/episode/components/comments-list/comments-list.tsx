import { Comment as TComment } from 'common/types/types';
import styles from './styles.module.scss';
import Comment from '../comment/comment';

type Props = {
  comments: TComment[];
};

const CommentsList: React.FC<Props> = ({ comments }) => {
  return (
    <div className={styles.commentsWrapper}>
      <input name="comment" type="text" placeholder="Write a comment"/>
      <h3>Comments</h3>
      {
        comments.length
          ? <ul className={styles.list}>
            {comments.map((item) => (
              <Comment comment={item} key={item.id} />
            ))}
          </ul>
          : <div>There&apos;s no comments yet.</div>
      }
    </div>
  );
};

export default CommentsList;
