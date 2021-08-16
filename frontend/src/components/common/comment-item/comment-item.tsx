import { Comment as TComment } from 'common/types/types';
import { getDistanceToDateNow } from 'helpers/date/date';
import ImageWrapper from '../image-wrapper/image-wrapper';
import styles from './styles.module.scss';
import { getTimeOffset } from 'helpers/helpers';

type Props = {
  comment: TComment;
  onClick?: (payload: number) => void;
};

const CommentItem: React.FC<Props> = ({ comment, onClick }) => {

  const time = getTimeOffset(comment.timestamp);

  const handleTimeLineJump = (): void => {
    onClick && onClick(comment.timestamp);
  };

  const distance = getDistanceToDateNow(
    new Date(comment.createdAt),
    Date.now(),
  );

  return (
    <li className={styles.wrapper}>
      <ImageWrapper
        width="40"
        height="40"
        loading="lazy"
        alt={String(comment.userId)}
        label={comment.user.nickname}
        className={styles.avatarWrapper}
      />
      <div className={styles.intro}>
        <p className={styles.userName}>
          {comment.user.nickname ?? comment.user.firstName}&nbsp;<span>at</span>
          &nbsp;
          {onClick
            ? <button
              className={styles.commentAtButton}
              onClick={handleTimeLineJump}>
              {time}
            </button>
            : time
          }
        </p>
        <p className={styles.text}>{comment.text}</p>
      </div>
      <div className={styles.date}>{distance} ago</div>
    </li>
  );
};

export default CommentItem;
