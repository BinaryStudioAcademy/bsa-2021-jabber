import notificationIcon from 'assets/img/notification-icon.png';
import { UserNotification } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';
import { Link } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  notification: UserNotification;
};

const NotificationItem: React.FC<Props> = ({ notification }) => {
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
        <h2 className={styles.infoTitle}>{notification.notification.title}</h2>
        <p className={styles.notificationText}>
          {notification.notification.message}
        </p>
        <Link to={AppRoute.NOTIFICATIONS} className={styles.link}>
          See message
        </Link>
      </div>
      <div className={styles.notificationStatus}>
        <button className={styles.buttonEye} />
        <span className={styles.notificationDate}>
          {notification.notification.createdAt}
        </span>
      </div>
    </li>
  );
};

export default NotificationItem;
