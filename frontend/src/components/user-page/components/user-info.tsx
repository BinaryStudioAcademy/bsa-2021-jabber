import { User } from 'common/types/types';
import styles from './styles.module.scss';

type Props = {
  user: User | null;
};

const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div>
      <p className={styles.title}>First Name:</p>
      <p className={styles.userInfo}>{user?.firstName}</p>
      <p className={styles.title}>Last Name:</p>
      <p className={styles.userInfo}>{user?.lastName}</p>
      <p className={styles.title}>Nickname:</p>
      <p className={styles.userInfo}>{user?.nickname}</p>
      <p className={styles.title}>Email:</p>
      <p className={styles.userInfo}>{user?.email}</p>
      <p className={styles.title}>Bio:</p>
      <p className={styles.userInfo}> </p>
    </div>
  );
};

export { UserInfo };
