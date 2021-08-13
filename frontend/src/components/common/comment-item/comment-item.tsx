import { Comment as TComment } from 'common/types/types';
import { getFormattedDate, getDistanceToDateNow } from 'helpers/date/date';
import { DateFormatType } from 'common/enums/enums';
import ImageWrapper from '../image-wrapper/image-wrapper';
import styles from './styles.module.scss';

type Props = {
  comment: TComment;
};

const Comment: React.FC<Props> = ({ comment }) => {
  const time = getFormattedDate(
    new Date(comment.createdAt),
    DateFormatType.HOURES_MINUTES,
  );
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
          &nbsp;{time}
        </p>
        <p className={styles.text}>{comment.text}</p>
      </div>
      <div className={styles.date}>{distance} ago</div>
    </li>
  );
};

export default Comment;
