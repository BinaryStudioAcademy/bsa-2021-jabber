import { useAppSelector } from 'hooks/hooks';
import { RootState } from 'common/types/types';
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
      <div className={styles.userInformation}>
        <img src="" width="256" height="256" />
        <h3 className={styles.title}>First Name:</h3>
        <h1 className={styles.userInfo}>{user?.firstName}</h1>
        <h3 className={styles.title}>Last Name:</h3>
        <h1 className={styles.userInfo}>{user?.lastName}</h1>
        <h3 className={styles.title}>Nickname:</h3>
        <h1 className={styles.userInfo}>{user?.nickname}</h1>
        <h3 className={styles.title}>Email:</h3>
        <h1 className={styles.userInfo}>{user?.email}</h1>
        <h3 className={styles.title}>Bio:</h3>
        <h1 className={styles.userInfo}> </h1>
      </div>
      <div className={styles.userAvatarWrapper}></div>
    </div>
  );
};

export default UserPage;
