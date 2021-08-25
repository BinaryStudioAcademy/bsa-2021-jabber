import { CommentItem } from 'components/common/common';
import { Comment, CommentReactionCreatePayload } from 'common/types/types';
import { UserRole } from 'common/enums/enums';
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

  const isMaster = user?.role === UserRole.MASTER;

  return (
    <ul className={styles.list}>
      {comments.map((item) => {
        const isAllowDelete = user?.id === item.userId || isMaster;
        return (
          <CommentItem
            hasTimestamp={hasTimestamps}
            onTimeClick={onTimeClick}
            onCommentDelete={onCommentDelete}
            comment={item}
            onCommentLike={onCommentLike}
            isAllowDelete={isAllowDelete}
            key={item.id}/>
        );
      })}
    </ul>
  );
};

export default CommentsList;
