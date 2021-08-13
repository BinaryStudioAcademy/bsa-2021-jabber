import NotificationItem from './components/notification-item';
import { RootState } from 'common/types/types';
import { useAppSelector } from 'hooks/hooks';
import styles from './styles.module.scss';

const Notifications: React.FC = () => {

  const { notifications } = useAppSelector(({ notification }: RootState) => ({
    notifications: notification.notifications,
  }));
  
  return (
    <ul className={styles.container}>
      {notifications.map((notification) => {
        <NotificationItem notification={notification}/>;
      })}
      
    </ul>
  );
};

export default Notifications;
