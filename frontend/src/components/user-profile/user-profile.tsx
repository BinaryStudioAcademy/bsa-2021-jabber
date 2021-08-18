import {
  Loader,
  PodcastList,
  ImageWrapper,
  Link,
} from 'components/common/common';
import { AppRoute, DataStatus } from 'common/enums/enums';
import { RootState } from 'common/types/types';
import { useAppSelector, useParams, useDispatch, useEffect } from 'hooks/hooks';
import { userProfile as userProfileActions } from 'store/actions';
import contactLogo from 'assets/img/user-profile/contact.svg';
import emailLogo from 'assets/img/user-profile/email.svg';
import { PageParams } from './common/types/types';
import styles from './styles.module.scss';

const UserPage: React.FC = () => {
  const { id } = useParams<PageParams>();

  const { currentUser, user, podcasts, dataStatus } = useAppSelector(
    ({ auth, userProfile }: RootState) => ({
      currentUser: auth.user,
      user: userProfile.user,
      podcasts: userProfile.podcasts,
      dataStatus: userProfile.dataStatus,
    }),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileActions.loadUser(Number(id)));
    dispatch(userProfileActions.loadPodcasts(Number(id)));
  }, [id]);

  const hasUser = Boolean(user);
  const hasPermitToEdit = currentUser?.id === Number(id);

  if (!hasUser && dataStatus === DataStatus.FULFILLED) {
    return (
      <div className={styles.containerUserNotFound}>
        <h1>User Not Found</h1>
      </div>
    );
  }

  return dataStatus === DataStatus.PENDING ? (
    <Loader />
  ) : (
    <div className={styles.container}>
      <main className={styles.userInfo}>
        <ImageWrapper
          width="195"
          height="195"
          loading="lazy"
          label={user?.nickname}
          className={styles.imageWrapper}
          src={user?.image?.url}
        />
        <div className={styles.mainUserInfo}>
          <div className={styles.userInfoHeader}>
            <span className={styles.boldHeaderInfo}>
              {user?.firstName} {user?.lastName}
            </span>
            <span className={styles.headerInfo}>
              <img
                src={contactLogo}
                width="18"
                height="18"
                className={styles.headerLogo}
              />
              {user?.nickname}
            </span>
            <span className={styles.headerInfo}>
              <img
                src={emailLogo}
                width="18"
                height="18"
                className={styles.headerLogo}
              />
              <a className={styles.emailLink} href={`mailto:${user?.email}`}>
                {user?.email}
              </a>
              ;
            </span>
          </div>
          {user?.bio && (
            <div className={styles.bioContainer}>
              <span className={styles.bioTitle}>Bio:</span>
              <span className={styles.bioText}>{user?.bio}</span>
            </div>
          )}
        </div>
        {hasPermitToEdit && (
          <Link
            to={`${AppRoute.USERS_EDIT}/${id}`}
            className={styles.editLink}
          />
        )}
      </main>
      <div className={styles.podcastsByUserContainer}>
        <h2 className={styles.podcastsByUserTitle}>My Podcasts</h2>
        {podcasts.length ? (
          <PodcastList podcasts={podcasts} />
        ) : (
          <span className={styles.oopsMessage}>
            Oops! There&apos;s nothing here
          </span>
        )}
      </div>
    </div>
  );
};

export default UserPage;
