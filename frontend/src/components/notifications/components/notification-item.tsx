import notificationIcon from 'assets/img/notification-icon.png';
import newNotificationEye from 'assets/img/eye.svg';
import { AppRoute } from 'common/enums/enums';
import { Link } from 'components/common/common';
import styles from './styles.module.scss';

const NotificationItem: React.FC = () => {
  return (
    <li className={styles.container}>
      <div className={styles.notificationLogo}>
        <img
          className={styles.image}
          src={notificationIcon}
          width="40"
          height="40"
        />
      </div>
      <div className={styles.notificationInfo}>
        <h2 className={styles.infoTitle}>
          You have a new message from Lincoln
        </h2>
        <p className={styles.notificationText}>
          Four score and seven years ago our fathers brought forth, on this
          continent, a new nation, conceived in Liberty, and dedicated to the
          proposition that all men are created equal. Now we are engaged in a
          great civil war, testing whether that nation, or any nation so
          conceived, and so dedicated, can long endure.
        </p>
        <Link to={AppRoute.NOTIFICATIONS} className={styles.link}>
          See message
        </Link>
      </div>
      <div className={styles.notificationStatus}>
        <button className={styles.buttonEye}>
          <img src={newNotificationEye} width="25" height="25" />
        </button>
        <span className={styles.notificationDate}>09:31</span>
      </div>
    </li>
  );
};

export default NotificationItem;
