import { getTimeOffset } from 'helpers/helpers';
import { Comment } from 'common/types/types';
import { User } from 'jabber-shared/common/types/types';
import { getDistanceToDateNow } from 'helpers/date/date';
import ImageWrapper from '../image-wrapper/image-wrapper';
import styles from './styles.module.scss';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';

type Props = {
  hasTimestamp?: boolean;
  comment: Comment;
  user?: User | null;
  onClick?: (payload: number) => void;
  onCommentDelete?: (commentId: number) => void;
};

const CommentItem: React.FC<Props> = ({ user, comment, onClick, hasTimestamp, onCommentDelete }) => {
  const isOwner = user?.id === comment.userId;
  const time = getTimeOffset(comment.timestamp);

  const handleTimeLineJump = (): void => {
    onClick && onClick(comment.timestamp);
  };

  const handleDeleteComment = (): void => {
    onCommentDelete && onCommentDelete(Number(comment.id));
  };

  const distance = getDistanceToDateNow(
    new Date(comment.createdAt),
    Date.now(),
  );

  return (
    <li className={styles.wrapper}>
      <Link to={`${AppRoute.USERS}/${comment.user.id}`} className={styles.link}>
        <ImageWrapper
          width="40"
          height="40"
          loading="lazy"
          alt={String(comment.userId)}
          label={comment.user.nickname}
          className={styles.avatarWrapper}
          src={comment.user.image?.url}
        />
      </Link>
      <div className={styles.intro}>
        <p className={styles.userName}>
          <Link
            to={`${AppRoute.USERS}/${comment.user.id}`}
            className={styles.link}
          >
            {comment.user.nickname ?? comment.user.firstName}
          </Link>
          {hasTimestamp && (
            <>
              &nbsp;<span>at</span>
              &nbsp;
              {onClick ? (
                <button
                  className={styles.commentAtButton}
                  onClick={handleTimeLineJump}
                >
                  {time}
                </button>
              ) : (
                time
              )}
            </>
          )}
        </p>
        <p className={styles.text}>{comment.text}</p>
      </div>
      <div className={styles.date}>{distance} ago</div>
      {isOwner &&
        <button
          onClick={handleDeleteComment}
          className={styles.deleteButton}
        >
          <span className="visually-hidden">Delete episode</span>
        </button>}
    </li>
  );
};

export default CommentItem;
