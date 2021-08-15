import NotificationItem from './components/notification-item';
import { RootState } from 'common/types/types';
import { useAppSelector } from 'hooks/hooks';
import styles from './styles.module.scss';

const Notifications: React.FC = () => {
  const { notifications } = useAppSelector(({ notification }: RootState) => ({
    notifications: notification.notifications,
  }));

  const hasNotificaions = Boolean(notifications.length);

  if (!hasNotificaions) {
    return (
      <div className={styles.containerUserNotFound}>
        <h1>You haven`t received any notifications yet.</h1>
      </div>
    );
  }

  return (
    <ul className={styles.container}>
      {notifications.map((notification) => {
        <NotificationItem notification={notification} key={notification.id} />;
      })}
    </ul>
  );
};

export default Notifications;
