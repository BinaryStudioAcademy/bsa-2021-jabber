import notificationIcon from 'assets/img/notification-icon.png';
import { UserNotification } from 'common/types/types';
import { DateFormatType, UserNotificationStatus } from 'common/enums/enums';
import styles from './styles.module.scss';
import { getAllowedClasses, getFormattedDate } from 'helpers/helpers';

type Props = {
  notification: UserNotification;
  onChangeStatus: (updateNotification: UserNotification) => void;
};

const NotificationItem: React.FC<Props> = ({ notification, onChangeStatus }) => {
  const formatedDate = getFormattedDate(new Date(notification.notification.updatedAt), DateFormatType.DAY_MONTH_YEAR);
  const isChecked = notification.status === UserNotificationStatus.CHECKED;

  const allowedClassesCheckButton = getAllowedClasses(
    styles.buttonEye,
    isChecked && styles.checked,
  );

  const handleChangeNotificationStatus = (): void => {
    const newStatus = isChecked
      ? UserNotificationStatus.UNCHECKED
      : UserNotificationStatus.CHECKED;

    onChangeStatus({
      ...notification,
      status: newStatus,
    });
  };

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
      </div>
      <div className={styles.notificationStatus}>
        <button className={allowedClassesCheckButton} onClick={handleChangeNotificationStatus} />
        <span className={styles.notificationDate}>
          {formatedDate}
        </span>
      </div>
    </li>
  );
};

export default NotificationItem;
