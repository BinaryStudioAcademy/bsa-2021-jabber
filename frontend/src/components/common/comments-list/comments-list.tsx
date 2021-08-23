import { CommentItem } from 'components/common/common';
import { Comment } from 'common/types/types';
import { UserRole } from 'common/enums/enums';
import { User } from 'jabber-shared/common/types/types';
import styles from './styles.module.scss';

type Props = {
  hasTimestamps?: boolean;
  comments: Comment[];
  user?: User | null;
  onTimeClick?: (payload: number) => void;
  onCommentDelete?: (commentId: number) => void;
};

const CommentsList: React.FC<Props> = ({
  user,
  comments,
  onTimeClick,
  hasTimestamps,
  onCommentDelete,
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
            isAllowDelete={isAllowDelete}
            key={item.id}/>
        );
      })}
    </ul>
  );
};

export default CommentsList;
