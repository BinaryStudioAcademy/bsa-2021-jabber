import { Comment } from 'common/types/types';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { getDistanceToDateNow } from 'helpers/date/date';
import { getAllowedClasses, getTimeOffset } from 'helpers/helpers';
import ImageWrapper from '../image-wrapper/image-wrapper';
import styles from './styles.module.scss';

type Props = {
  hasTimestamp?: boolean;
  comment: Comment;
  isAllowDelete: boolean;
  isOwner: boolean;
  isLiked: boolean;
  onTimeClick?: (payload: number) => void;
  onCommentDelete?: (commentId: number) => void;
  onToggleCommentLike?: (commentId: number) => void;
};

const CommentItem: React.FC<Props> = ({
  isLiked,
  isOwner,
  isAllowDelete,
  comment,
  onTimeClick,
  hasTimestamp,
  onCommentDelete,
  onToggleCommentLike,
}) => {

  const time = getTimeOffset(comment.timestamp);
  const hasLikes = Boolean(comment.commentReactions?.length);

  const handleTimeLineJump = (): void => {
    onTimeClick?.(comment.timestamp);
  };

  const handleDeleteComment = (): void => {
    onCommentDelete?.(Number(comment.id));
  };

  const handleCommentLikeToggle = (): void => {
    onToggleCommentLike?.(comment.id);
  };

  const distance = getDistanceToDateNow(
    new Date(comment.createdAt),
    Date.now(),
  );

  const allowedClasses = getAllowedClasses(
    styles.likeButton,
    isLiked && styles.likeButtonField,
    isOwner && styles.likeButtonOwner,
  );

  return (
    <li className={styles.commentWrapper}>
      <div className={styles.commentInfo}>
        <Link
          to={`${AppRoute.USERS}/${comment.user.id}`}
          className={styles.avatarLink}
        >
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
        <div className={styles.content}>
          <div className={styles.contentTop}>
            <Link
              to={`${AppRoute.USERS}/${comment.user.id}`}
              className={styles.contentUser}
            >
              {comment.user.nickname ?? comment.user.firstName}
            </Link>
            {hasTimestamp && (
              <div className={styles.contentTimestamp}>
                <span>at</span>
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
              </div>
            )}
            <div className={styles.contentDate}>{distance} ago</div>
          </div>
          <div className={styles.contentText}>{comment.text}</div>
        </div>
      </div>
      <div className={styles.btnsWrapper}>
        {isAllowDelete && (
          <button onClick={handleDeleteComment} className={styles.deleteButton}>
            <span className="visually-hidden">Delete episode</span>
          </button>
        )}
        <div className={styles.btnLikeWrapper}>
          <button
            onClick={handleCommentLikeToggle}
            className={allowedClasses}
            disabled={isOwner}
          ></button>
          <span className={styles.likesCount}>
            {hasLikes ? comment.commentReactions.length : ''}
          </span>
        </div>
      </div>
    </li>
  );
};

export default CommentItem;
