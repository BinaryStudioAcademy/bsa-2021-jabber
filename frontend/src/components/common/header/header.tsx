import { useAppSelector, useDispatch, useVisible } from 'hooks/hooks';
import { AppRoute, ButtonType } from 'common/enums/enums';
import { RootState } from 'common/types/types';
import { Button, Link, ImageWrapper, PopUp } from 'components/common/common';
import { auth as authActions } from 'store/actions';
import logo from 'assets/img/logo.svg';
import headerBell from 'assets/img/header-bell.svg';
import { getAllowedClasses } from 'helpers/helpers';
import './popus.styles.scss';
import styles from './styles.module.scss';

const Header: React.FC = () => {
  const { user } = useAppSelector(({ auth }: RootState) => ({
    user: auth.user,
  }));

  const hasUser = Boolean(user);

  const dispatch = useDispatch();

  const {
    ref: profileRef,
    isVisible: isProfileVisible,
    setIsVisible: setProfileIsVisible,
  } = useVisible(false);

  const {
    ref: burgerRef,
    isVisible: isBurgerVisible,
    setIsVisible: setBurgerIsVisible,
  } = useVisible(false);

  const handleMenuToggle = (): void => {
    setProfileIsVisible(!isProfileVisible);
  };

  const handleBurgerToggle = (): void => {
    setBurgerIsVisible(!isBurgerVisible);
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
            <ul
              className={getAllowedClasses(
                styles.navigation,
                isBurgerVisible && styles.active,
              )}
            >
              <li className={styles.navigationItem}>
                <Link to={AppRoute.ROOT} className={styles.link}>
                  Podcasts
                </Link>
              </li>
              <li className={styles.navigationItem}>
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

              <div className={styles.profile} ref={profileRef}>
                <PopUp
                  trigger={
                    <button
                      className={styles.profileBtn}
                      onClick={handleMenuToggle}
                    >
                      <ImageWrapper
                        width="40"
                        height="40"
                        loading="lazy"
                        label={user?.nickname}
                        className={styles.imageWrapper}
                        src={user?.image?.url}
                      />
                    </button>
                  }
                >
                  <div
                    className={getAllowedClasses(
                      styles.dropDown,
                      isProfileVisible && styles.active,
                    )}
                  >
                    <ul className={styles.dropDownList}>
                      <li className={styles.dropDownListItem}>
                        <Link to={AppRoute.PODCASTS_EDIT} className={styles.link}>
                          + Add Podcast
                        </Link>
                      </li>
                      <li className={styles.dropDownListItem}>
                        <Link
                          to={AppRoute.ROOT}
                          className={styles.link}
                          onClick={handleUserExit}
                        >
                          Exit
                        </Link>
                      </li>
                    </ul>
                  </div>
                </PopUp>
              </div>
            </div>
            <PopUp
              trigger={
                <div
                  className={getAllowedClasses(
                    styles.burgerMenu,
                    isBurgerVisible && styles.active,
                  )}
                  onClick={handleBurgerToggle}
                  ref={burgerRef}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              }
            >
              <ul
                className={getAllowedClasses(
                  styles.navigation,
                  styles.burgerNav,
                  isBurgerVisible && styles.active,
                )}
              >
                <li className={styles.navigationItem}>
                  <Link to={AppRoute.ROOT} className={styles.link}>
                    Podcasts
                  </Link>
                </li>
                <li className={styles.navigationItem}>
                  <Link
                    to={`${AppRoute.USERS}/${user?.id}`}
                    className={styles.link}
                  >
                    My Profile
                  </Link>
                </li>
              </ul>
            </PopUp>
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
