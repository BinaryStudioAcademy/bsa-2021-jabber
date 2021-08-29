import { Comment } from 'common/types/types';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { getDistanceToDateNow } from 'helpers/date/date';
import { getAllowedClasses, getTimeOffset } from 'helpers/helpers';
import { DEFAULT_COMMENT_COUNT } from './common/constants';
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
            onClick={handleCommentLikeToggle}
            className={allowedClasses}
            disabled={isOwner}
          >
          </button>
          <span className={styles.likesCount}>
            {comment.commentReactions?.length ?? DEFAULT_COMMENT_COUNT}
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
