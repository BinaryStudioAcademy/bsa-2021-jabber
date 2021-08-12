import NotificationItem from './components/notification-item';
import styles from './styles.module.scss';

const Notifications: React.FC = () => {
  return (
    <li className={styles.container}>
      <NotificationItem />
    </li>
  );
};

export default Notifications;
