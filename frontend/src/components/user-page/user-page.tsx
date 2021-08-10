import { useAppSelector, useEffect, useDispatch } from 'hooks/hooks';
import { RootState } from 'common/types/types';
import contactLogo from './assets/contact.svg';
import editLogo from './assets/edit.svg';
import { PodcastList } from 'components/common/common';
import emailLogo from './assets/email.svg';
import { homepage as homepageActions } from 'store/actions';
import styles from './styles.module.scss';

const UserPage: React.FC = () => {
  const { user } = useAppSelector(({ auth }: RootState) => ({
    user: auth.user,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(homepageActions.loadPodcasts());
  }, []);

  const hasUser = Boolean(user);

  if (!hasUser) {
    return (
      <div className={styles.containerUserNotFound}>
        <h1>Not User Found</h1>
      </div>
    );
  }

  const { podcasts } = useAppSelector(({ homepage }) => ({
    podcasts: homepage.podcasts,
  }));

  return (
    <div className={styles.container}>
      <main className={styles.userInfo}>
        <div className={styles.imageContainer}>
          <img
            src="http://res.cloudinary.com/hmqu8gtpn/image/upload/v1628597464/2/zxqhnwo2izhud72qbjg6.jpg"
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
            <img src={editLogo} />
          </button>
        </div>
      </main>
      <div className={styles.favoritePodcastContainer}>
        <span className={styles.favoritePodcastTitle}>Favorite Podcasts</span>
        <div className={styles.podcasts}>
          <PodcastList podcasts={podcasts} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
