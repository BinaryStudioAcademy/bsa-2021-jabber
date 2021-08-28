import NotificationItem from './components/notification-item';
import { RootState } from 'common/types/types';
import { useAppSelector, useEffect, useDispatch } from 'hooks/hooks';
import { notification as notificationAction } from 'store/actions';
import styles from './styles.module.scss';

const Notifications: React.FC = () => {
  const { notifications, userId } = useAppSelector(({ notification, auth }: RootState) => ({
    notifications: notification.notifications,
    userId: auth.user?.id,
  }));

  const dispatch = useDispatch();

  const hasNotificaions = Boolean(notifications.length);

  useEffect(() => {
    if (userId) {
      dispatch(notificationAction.loadNotifications(userId));
    }
  }, []);

  if (!hasNotificaions) {
    return (
      <div className={styles.containerUserNotFound}>
        <h1>You haven`t received any notifications yet.</h1>
      </div>
    );
  }

  return (
    <ul className={styles.container}>
      {notifications.map((notification) => (
        <NotificationItem notification={notification} key={notification.id} />
      ))}
    </ul>
  );
};

export default Notifications;
