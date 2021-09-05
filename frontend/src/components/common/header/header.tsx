import { useAppSelector, useDispatch } from 'hooks/hooks';
import { AppRoute, ButtonType } from 'common/enums/enums';
import { RootState } from 'common/types/types';
import { Button, Link, ImageWrapper, Popuper } from 'components/common/common';
import { auth as authActions } from 'store/actions';
import logo from 'assets/img/logo.svg';
import headerBell from 'assets/img/header-bell.svg';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

const Header: React.FC = () => {
  const { user, countUncheckedNotification } = useAppSelector(({ auth, notification }: RootState) => ({
    user: auth.user,
    countUncheckedNotification: notification.countUncheckedNotification,
  }));

  const hasUser = Boolean(user);
  const dispatch = useDispatch();

  const handleUserExit = (): void => {
    dispatch(authActions.resetUser());
  };

  const isShowNotificationIndicator = Boolean(countUncheckedNotification);

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
              <li className={styles.navigationItem}>
                <Link to={AppRoute.ROOT} className={styles.link}>
                  Podcasts
                </Link>
              </li>
            </ul>
            <div className={styles.userInfo}>
              <Button
                label="+ Create Podcast"
                href={AppRoute.PODCASTS_EDIT}
                type={ButtonType.BUTTON}
              />
              <Link to={AppRoute.NOTIFICATIONS} className={styles.notificationLink}>
                <img
                  src={headerBell}
                  width="23"
                  height="23"
                  loading="lazy"
                  alt=""
                  className={styles.notification}
                />
                {isShowNotificationIndicator &&
                <div className={styles.newNotificationIndicator}>
                  {countUncheckedNotification}
                </div>}
              </Link>

              <div className={styles.profile}>
                <Popuper
                  trigger={
                    <button className={styles.profileBtn}>
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
                  renderContent={(close): JSX.Element => (
                    <div
                      className={styles.dropDown}
                    >
                      <ul className={styles.dropDownList} onClick={close}>
                        <li className={styles.dropDownListItem}>
                          <Link
                            to={`${AppRoute.USERS}/${user?.id}`}
                            className={styles.link}
                          >
                            My Profile
                          </Link>
                        </li>
                        <li className={styles.dropDownListItem}>
                          <Link
                            to={`${AppRoute.PLAYLISTS_USERS}/${user?.id}`}
                            className={styles.link}
                          >
                            My Playlists
                          </Link>
                        </li>
                        <li className={styles.dropDownListItem}>
                          <Link
                            to={AppRoute.PODCASTS_EDIT}
                            className={styles.link}
                          >
                            + Create Podcast
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
                    </div>)}
                />
              </div>
            </div>
            <Popuper
              trigger={
                <div
                  className={styles.burgerMenu}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              }
              renderContent={(close): JSX.Element => (
                <ul
                  className={getAllowedClasses(
                    styles.navigation,
                    styles.burgerNav,
                  )}
                  onClick={close}
                >
                  <li className={styles.navigationItem}>
                    <Link to={AppRoute.ROOT} className={styles.link}>
                      Podcasts
                    </Link>
                  </li>
                </ul>)}
            />
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
