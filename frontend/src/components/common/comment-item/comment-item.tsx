import { getAllowedClasses, getTimeOffset } from 'helpers/helpers';
import { Comment, CommentReactionCreatePayload } from 'common/types/types';
import { getDistanceToDateNow } from 'helpers/date/date';
import ImageWrapper from '../image-wrapper/image-wrapper';
import styles from './styles.module.scss';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';

type Props = {
  hasTimestamp?: boolean;
  comment: Comment;
  isAllowDelete: boolean;
  isOwner: boolean;
  isLiked: boolean;
  onTimeClick?: (payload: number) => void;
  onCommentDelete?: (commentId: number) => void;
  onCommentLike?: (payload: CommentReactionCreatePayload) => void;
};

const CommentItem: React.FC<Props> = ({
  isLiked,
  isOwner,
  isAllowDelete,
  comment,
  onTimeClick,
  hasTimestamp,
  onCommentDelete,
  onCommentLike,
}) => {
  const time = getTimeOffset(comment.timestamp);

  const handleTimeLineJump = (): void => {
    onTimeClick?.(comment.timestamp);
  };

  const handleDeleteComment = (): void => {
    onCommentDelete?.(Number(comment.id));
  };

  const handleLikeComment = (): void => {
    onCommentLike?.({ commentId: comment.id });
  };

  const distance = getDistanceToDateNow(
    new Date(comment.createdAt),
    Date.now(),
  );
  const filled = isLiked ? 'Filled' : '';

  const allowedClasses = getAllowedClasses(
    styles.likeButton,
    styles[`like${filled}`],
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
              {onTimeClick ? (
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
      <div className={styles.btnsWrapper}>
        <div className={styles.btnLikeWrapper}>
          <button
            onClick={handleLikeComment}
            className={allowedClasses}
            disabled={isOwner}
          >
          </button>
          <span className={styles.likesCount}>
            {comment.commentReactions?.length ?? 0}
          </span>
        </div>
        {isAllowDelete &&
          <button
            onClick={handleDeleteComment}
            className={styles.deleteButton}
          >
            <span className="visually-hidden">Delete episode</span>
          </button>}
      </div>
    </li>
  );
};

export default CommentItem;
