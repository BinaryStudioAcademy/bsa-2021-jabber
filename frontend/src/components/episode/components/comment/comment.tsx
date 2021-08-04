import { Comment as TComment } from 'common/types/types';
import { getFormattedDate, getDistanceToDateNow } from 'helpers/date/date';
import avatar from 'assets/img/user.png';
import styles from './styles.module.scss';

type Props = {
  comment: TComment;
};

const Comment: React.FC<Props> = ({ comment }) => {
  const time = getFormattedDate(new Date(comment.createdAt), 'HH:mm');
  const distance = getDistanceToDateNow(new Date(comment.createdAt), Date.now());
  return (
    <li className={styles.wrapper}>
      <div className={styles.avatarWrapper}>
        <img src={avatar} width="40" height="40" loading="lazy" alt={`${comment.userId}`}/>
      </div>
      <div className={styles.intro}>
        <p className={styles.userName}>{comment.userId}&nbsp;<span>at</span>&nbsp;{time}</p>
        <p className={styles.text}>{comment.text}</p>
      </div>
      <div className={styles.date}>{distance} ago</div>
    </li>
  );
};

export default Comment;
