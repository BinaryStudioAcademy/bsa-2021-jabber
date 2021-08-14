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

  if (!hasUser) {
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
              {user?.email}
            </span>
          </div>
          <div className={styles.bioContainer}>
            <span className={styles.bioTitle}>Bio:</span>
            <span className={styles.bioText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              quasi sunt vel nulla. Porro, assumenda atque modi quam dolores ab
              sit vel voluptate unde. Molestias expedita ipsam exercitationem et
              necessitatibus eos vel a, doloribus qui voluptas dolores eveniet
            </span>
          </div>
          {hasPermitToEdit && (
            <Link
              to={`${AppRoute.USERS_EDIT}/${id}`}
              className={styles.editLink}
            />
          )}
        </div>
      </main>
      <div className={styles.favoritePodcastContainer}>
        <h2 className={styles.favoritePodcastTitle}>My Podcasts</h2>
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
