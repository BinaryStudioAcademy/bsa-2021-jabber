import { useAppSelector, useParams, useDispatch, useEffect } from 'hooks/hooks';
import { Loader, PodcastList } from 'components/common/common';
import { RootState } from 'common/types/types';
import contactLogo from 'assets/img/user-profile/contact.svg';
import editLogo from 'assets/img/user-profile/edit.svg';
import emailLogo from 'assets/img/user-profile/email.svg';
import defaultImage from 'assets/img/user-profile/default-profile-picture.jpg';
import styles from './styles.module.scss';
import { userProfile as userProfileActions } from 'store/actions';
import { DataStatus } from 'common/enums/enums';
import { PageParams } from './common/types/types';

const UserPage: React.FC = () => {
  const { id } = useParams<PageParams>();
  const { user, podcasts, dataStatus } = useAppSelector(({ userProfile }: RootState) => ({
    user: userProfile.user,
    podcasts: userProfile.podcasts,
    dataStatus: userProfile.dataStatus,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileActions.loadUser(Number(id)));
    dispatch(userProfileActions.loadPodcasts(Number(id)));
  }, [id]);

  const hasUser = Boolean(user);

  if (!hasUser) {
    return (
      <div className={styles.containerUserNotFound}>
        <h1>User Not Found</h1>
      </div>
    );
  }

  return (
    dataStatus === DataStatus.PENDING
      ? <Loader/>
      : (
        <div className={styles.container}>
          <main className={styles.userInfo}>
            <div className={styles.imageContainer}>
              <img
                src={defaultImage}
                width="195"
                height="195"
                className={styles.userAvatar}
              />
            </div>
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
              <button className={styles.editButton}>
                <img src={editLogo}/>
              </button>
            </div>
          </main>
          <div className={styles.favoritePodcastContainer}>
            <h2 className={styles.favoritePodcastTitle}>Favorite Podcasts</h2>
            <div className={styles.podcasts}></div>
            <h2 className={styles.favoritePodcastTitle}>My Podcasts</h2>
            {podcasts.length
              ? <PodcastList podcasts={podcasts}/>
              : (
                <span className={styles.oopsMessage}>
                  Oops! There&apos;s nothing here
                </span>
              )}
          </div>
        </div>
      )
  );
};

export default UserPage;
