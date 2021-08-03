import { Comment as TComment } from 'common/types/types';
import styles from './styles.module.scss';
import Comment from '../comment/comment';

type Props = {
  comments: TComment[];
};

const CommentsList: React.FC<Props> = ({ comments }) => {
  return (
    <>
      <input name="comment" type="text" placeholder="Write a comment"/>
      {
        comments.length
          ? <ul className={styles.list}>
            {comments.map((item) => (
              <Comment comment={item} key={item.id} />
            ))}
          </ul>
          : <div>There&apos;s no comments yet.</div>
      }
    </>
  );
};

export default CommentsList;
