import { useAppSelector, useDispatch, useVisible, useState } from 'hooks/hooks';
import { AppRoute, ButtonType } from 'common/enums/enums';
import { RootState } from 'common/types/types';
import { Button, Link, ImageWrapper } from 'components/common/common';
import { auth as authActions } from 'store/actions';
import logo from 'assets/img/logo.svg';
import headerBell from 'assets/img/header-bell.svg';
import { getAllowedClasses } from 'helpers/helpers';
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

  const [isShowNav, setIsShowNav] = useState(false);

  const handleShowNav = (): void => {
    setIsShowNav(!isShowNav);
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
            <ul className={isShowNav ? getAllowedClasses(styles.navigation, styles.active) : styles.navigation} onClick={():void => setIsShowNav(!isShowNav)}>
              <li className={styles.liNavigation}>
                <Link to={AppRoute.ROOT} className={styles.link}>
                  Podcasts
                </Link>
              </li>
              <li className={styles.liNavigation}>
                <Link
                  to={`${AppRoute.USERS}/${user?.id}`}
                  className={styles.link}
                >
                  My Profile
                </Link>
              </li>
            </ul>
            <div className={styles.userInfo}>
              <Button
                label="+ Create Podcast"
                href={AppRoute.PODCASTS_EDIT}
                type={ButtonType.BUTTON}
              />
              <Link to={AppRoute.NOTIFICATIONS}>
                <img
                  src={headerBell}
                  width="23"
                  height="23"
                  loading="lazy"
                  alt=""
                  className={styles.notification}
                />
              </Link>
              <div className={styles.profile} ref={ref}>
                <button
                  className={styles.usersButtonWrapper}
                  onClick={handleMenuToggle}
                >
                  <ImageWrapper
                    width="40"
                    height="40"
                    loading="lazy"
                    label={user?.nickname}
                    className={styles.imageWrapper}
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
        <div className={isShowNav ? getAllowedClasses(styles.burgerMenu, styles.active) : styles.burgerMenu} onClick={handleShowNav}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
