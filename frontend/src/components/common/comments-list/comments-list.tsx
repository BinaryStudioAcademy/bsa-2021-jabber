import { CommentItem } from 'components/common/common';
import { Comment } from 'common/types/types';
import { UserRole } from 'common/enums/enums';
import { User } from 'jabber-shared/common/types/types';
import { checkIsLiked } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  hasTimestamps?: boolean;
  comments: Comment[];
  user?: User | null;
  onTimeClick?: (payload: number) => void;
  onCommentDelete?: (commentId: number) => void;
  onToggleCommentLike?: (commentId: number) => void;
};

const CommentsList: React.FC<Props> = ({
  user,
  comments,
  onTimeClick,
  hasTimestamps,
  onCommentDelete,
  onToggleCommentLike,
}) => {

  const isMaster = user?.role === UserRole.MASTER;

  return (
    <ul className={styles.list}>
      {comments.map((item) => {
        const isOwner = user?.id === item.userId;
        const isAllowDelete = user?.id === item.userId || isMaster;
        const isLiked = checkIsLiked(item, user?.id);
        return (
          <CommentItem
            hasTimestamp={hasTimestamps}
            onTimeClick={onTimeClick}
            onCommentDelete={onCommentDelete}
            comment={item}
            onToggleCommentLike={onToggleCommentLike}
            isOwner={isOwner}
            isLiked={isLiked}
            isAllowDelete={isAllowDelete}
            key={item.id} />
        );
      })}
    </ul>
  );
};

export default CommentsList;
