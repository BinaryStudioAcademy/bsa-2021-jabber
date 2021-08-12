import NotificationItem from './components/notification-item';
import { useSelector } from 'hooks/hooks';
import styles from './styles.module.scss';

const Notifications: React.FC = () => {

  useSelector;
  
  return (
    <ul className={styles.container}>
      <NotificationItem />
    </ul>
  );
};

export default Notifications;
