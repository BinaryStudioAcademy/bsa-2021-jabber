import { CommentItem } from 'components/common/common';
import { Comment } from 'common/types/types';
import { User } from 'jabber-shared/common/types/types';
import styles from './styles.module.scss';

type Props = {
  hasTimestamps?: boolean;
  comments: Comment[];
  user?: User | null;
  onClick?: (payload: number) => void;
};

const CommentsList: React.FC<Props> = ({ user, comments, onClick, hasTimestamps }) => {
  return (
    <ul className={styles.list}>
      {comments.map((item) => (
        <CommentItem
          hasTimestamp={hasTimestamps}
          onClick={onClick}
          comment={item}
          user={user}
          key={item.id} />
      ))}
    </ul>
  );
};

export default CommentsList;
