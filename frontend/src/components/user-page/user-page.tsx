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
        <h1>Not User Found</h1>
      </div>
    );
  }

  return <div className={styles.container}></div>;
};

export default UserPage;
