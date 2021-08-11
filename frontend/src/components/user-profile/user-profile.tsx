import { useAppSelector } from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { DefaultImage } from 'components/common/common';
import contactLogo from 'assets/img/user-profile/contact.svg';
import editLogo from 'assets/img/user-profile/edit.svg';
import emailLogo from 'assets/img/user-profile/email.svg';
import styles from './styles.module.scss';

const UserPage: React.FC = () => {
  const { user } = useAppSelector(({ auth }: RootState) => ({
    user: auth.user,
  }));

  const hasUser = Boolean(user);

  if (!hasUser) {
    return (
      <div className={styles.containerUserNotFound}>
        <h1>User Not Found</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.userInfo}>
        <div className={styles.imageContainer}>
          <DefaultImage label={user?.nickname} />
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
        <h2 className={styles.favoritePodcastTitle}>Favorite Podcasts</h2>
        <div className={styles.podcasts}></div>
      </div>
    </div>
  );
};

export default UserPage;
