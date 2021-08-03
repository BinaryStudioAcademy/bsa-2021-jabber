import { useAppSelector, useVisible } from 'hooks/hooks';
import { AppRoute, ButtonType } from 'common/enums/enums';
import { RootState } from 'common/types/types';
import { Button, Link } from 'components/common/common';
import defaultAvatar from 'assets/img/default-user-avatar.svg';
import logo from 'assets/img/logo.svg';
import styles from './styles.module.scss';

const Header: React.FC = () => {
  const { user } = useAppSelector(({ auth }: RootState) => ({
    user: auth.user,
  }));

  const hasUser = Boolean(user);

  const { ref, isVisible, setIsVisible } = useVisible(false);

  const handleMenuToggle = (): void => {
    setIsVisible(!isVisible);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Link to={AppRoute.ROOT} className={styles.link}>
          <img src={logo} width="103" height="35" loading="lazy" alt="" />
          <span className="visually-hidden">Home page</span>
        </Link>
        {hasUser ? (
          <>
            <ul className={styles.navigation}>
              <li className={styles.liNavigation}>
                <Link to={AppRoute.ROOT} className={styles.link}>
                  Podcasts
                </Link>
              </li>
            </ul>
            <div className={styles.userInfo}>
              <Button label="+ Create Podcast" type={ButtonType.BUTTON} />
              <div className={styles.profile} ref={ref}>
                <button
                  className={styles.usersButtonWrapper}
                  onClick={handleMenuToggle}
                >
                  <img
                    className={styles.profileAvatar}
                    src={defaultAvatar}
                    width="40px"
                    height="40px"
                    alt="avatar"
                    loading="lazy"
                  />
                  {isVisible && (
                    <div className={styles.dropDown}>
                      <ul className={styles.dropDownList}>
                        <li className={styles.dropDownListElement}>
                          <Link to={AppRoute.PODCAST} className={styles.link}>
                            + Add Podcast
                          </Link>
                        </li>
                      </ul>
                      <div className={styles.dropDownArrow}></div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.signIn}>
            <Link to={AppRoute.SIGN_IN} className={styles.signInText}>
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
