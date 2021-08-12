import NotificationItem from './components/notification-item';
import styles from './styles.module.scss';

const Notifications: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.notificationsHeader}>
        <input type="checkbox" id="check3" />
        <label htmlFor="check3" className={styles.checkBoxTitle}>
          Mark all as read
        </label>
      </div>
      <NotificationItem />
    </div>
  );
};

export default Notifications;
