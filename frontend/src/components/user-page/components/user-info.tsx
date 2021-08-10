import { User } from 'common/types/types';
import styles from './styles.module.scss';

type Props = {
  user: User | null;
};

const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div>
      <div className={styles.infoBlock}>
        <span className={styles.title}>First Name:</span>
        <span className={styles.userInfo}>{user?.firstName}</span>
      </div>
      <div className={styles.infoBlock}>
        <span className={styles.title}>Last Name:</span>
        <span className={styles.userInfo}>{user?.lastName}</span>
      </div>
      <div className={styles.infoBlock}>
        <span className={styles.title}>Nickname:</span>
        <span className={styles.userInfo}>{user?.nickname}</span>
      </div>
      <div className={styles.infoBlock}>
        <span className={styles.title}>Email:</span>
        <span className={styles.userInfo}>{user?.email}</span>
      </div>
      <div className={styles.infoBlock}>
        <span className={styles.title}>Bio:</span>
        <span className={styles.userInfo}> </span>
      </div>
    </div>
  );
};

export { UserInfo };
