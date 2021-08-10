import React from 'react';
import { useAppSelector, useDispatch, useVisible } from 'hooks/hooks';
import { AppRoute, ButtonType } from 'common/enums/enums';
import { RootState } from 'common/types/types';
import { Button, Link } from 'components/common/common';
import { auth as authActions } from 'store/actions';
import defaultAvatar from 'assets/img/default-user-avatar.svg';
import logo from 'assets/img/logo.svg';
import styles from './styles.module.scss';

const Header: React.FC = () => {
  const { user } = useAppSelector(({ auth }: RootState) => ({
    user: auth.user,
  }));
  const hasUser = Boolean(user);

  const dispatch = useDispatch();
  const { ref, isVisible, setIsVisible } = useVisible(false);

  const handleMenuToggle = (): void => {
    setIsVisible(!isVisible);
  };

  const handleUserExit = (evt: React.MouseEvent): void => {
    evt.preventDefault();
    dispatch(authActions.resetUser());
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
              <li className={styles.liNavigation}>
                <Link to={AppRoute.USER_PAGE} className={styles.link}>
                  My Profile
                </Link>
              </li>
            </ul>
            <div className={styles.userInfo}>
              <Link to={AppRoute.PODCASTS_EDIT} className={styles.link}>
                <Button label="+ Create Podcast" type={ButtonType.BUTTON} />
              </Link>
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
                </button>
                {isVisible && (
                  <div className={styles.dropDown}>
                    <ul className={styles.dropDownList}>
                      <li className={styles.dropDownListElement}>
                        <Link
                          to={AppRoute.PODCASTS_EDIT}
                          className={styles.link}
                        >
                          + Add Podcast
                        </Link>
                      </li>
                      <li className={styles.dropDownListElement}>
                        <Link
                          to={AppRoute.ROOT}
                          className={styles.link}
                          onClick={handleUserExit}
                        >
                          Exit
                        </Link>
                      </li>
                    </ul>
                    <div className={styles.dropDownArrow}></div>
                  </div>
                )}
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
