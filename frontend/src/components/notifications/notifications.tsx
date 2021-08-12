import NotificationItem from './components/notification-item';
import styles from './styles.module.scss';

const Notifications: React.FC = () => {
  return (
    <div className={styles.container}>
      <NotificationItem />
    </div>
  );
};

export default Notifications;
