import { useAppSelector } from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { UserInfo } from './components/user-info';
import styles from './styles.module.scss';

const UserPage: React.FC = () => {
  const { user } = useAppSelector(({ auth }: RootState) => ({
    user: auth.user,
  }));

  const hasUser = Boolean(user);

  if (!hasUser) {
    return (
      <div className={styles.containerUserNotFound}>
        <h1 className={styles.userNotFound}>Not User Found</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <img src="" width="256" height="256" />

      <div className={styles.userInformation}>
        <UserInfo user={user} />
      </div>
    </div>
  );
};

export default UserPage;
