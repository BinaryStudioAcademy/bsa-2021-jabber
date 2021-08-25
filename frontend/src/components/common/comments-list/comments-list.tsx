import { CommentItem } from 'components/common/common';
import { Comment, CommentReactionCreatePayload } from 'common/types/types';
import { User } from 'jabber-shared/common/types/types';
import styles from './styles.module.scss';

type Props = {
  hasTimestamps?: boolean;
  comments: Comment[];
  user?: User | null;
  onTimeClick?: (payload: number) => void;
  onCommentDelete?: (commentId: number) => void;
  onCommentLike?: (payload: CommentReactionCreatePayload) => void;
};

const CommentsList: React.FC<Props> = ({
  user,
  comments,
  onTimeClick,
  hasTimestamps,
  onCommentDelete,
  onCommentLike,
}) => {
  return (
    <ul className={styles.list}>
      {comments.map((item) => (
        <CommentItem
          hasTimestamp={hasTimestamps}
          onTimeClick={onTimeClick}
          onCommentDelete={onCommentDelete}
          onCommentLike={onCommentLike}
          comment={item}
          isOwner={user?.id === item.userId}
          key={item.id} />
      ))}
    </ul>
  );
};

export default CommentsList;
