import { Comment as TComment } from 'common/types/types';
import { getFormattedDate, getDistanceToDateNow } from 'helpers/date/date';
import styles from './styles.module.scss';

const DEFAULT_AVATAR = 'https://image.flaticon.com/icons/png/512/848/848043.png';

type Props = {
  comment: TComment;
};

const Comment: React.FC<Props> = ({ comment }) => (
  <li className={styles.wrapper}>
    <div className={styles.avatarWrapper}>
      <img src={DEFAULT_AVATAR} width="40" height="40" loading="lazy" alt={`${comment.userId}`}/>
    </div>
    <div className={styles.intro}>
      <p className={styles.userName}>{comment.userId}&nbsp;<span>at</span>&nbsp;{getFormattedDate(new Date(comment.createdAt), 'HH:mm')}</p>
      <p className={styles.text}>{comment.text}</p>
    </div>
    <div className={styles.date}>{getDistanceToDateNow(new Date(comment.createdAt), Date.now())} ago</div>
  </li>
);

export default Comment;
