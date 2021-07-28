import { useAppSelector } from 'hooks/hooks';
import { AppRoute, ButtonType } from 'common/enums/enums';
import { RootState } from 'common/types/types';
import { Button, Link } from 'components/common/common';
import defaultAvatar from 'assets/img/default-user-avatar.svg';
import styles from './header.module.scss';

const Header: React.FC = () => {
  const { user } = useAppSelector(({ auth }: RootState) => ({
    user: auth.user,
  }));

  const hasUser = Boolean(user);

  return (
    <header className={styles.container}>
      <div className={styles.logoContainer}>
        <div className={styles.logoContainerLogo}></div>
        <span>Logo</span>
      </div>

      <ul className={styles.navigation}>
        <li className={styles.liNavigation}>Podcasts</li>
        <li className={styles.liNavigation}>Streaming</li>
        <li className={styles.liNavigation}>Setting</li>
      </ul>

      {hasUser ? (
        <div className={styles.userInfo}>
          <Button label="+ Create Podcast" type={ButtonType.BUTTON} />
          <div className={styles.profile}>
            <img
              className={styles.profileAvatar}
              src={defaultAvatar}
              width="40px"
              height="40px"
              alt="avatar"
              loading="lazy"
            />
          </div>
        </div>
      ) : (
        <div className={styles.signIn}>
          <Link to={AppRoute.SIGN_IN} className={styles.signInText}>
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
