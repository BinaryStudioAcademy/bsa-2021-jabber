import NotificationItem from './components/notification-item';
import styles from './styles.module.scss';

const Notifications: React.FC = () => {
  return (
    <ul className={styles.container}>
      <NotificationItem />
    </ul>
  );
};

export default Notifications;
