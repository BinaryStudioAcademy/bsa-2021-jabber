import NotificationItem from './components/notification-item';
import { RootState, UserNotification } from 'common/types/types';
import { DataStatus } from 'common/enums/enums';
import { Loader } from 'components/common/common';
import { useAppSelector, useEffect, useDispatch } from 'hooks/hooks';
import { notification as notificationAction } from 'store/actions';
import styles from './styles.module.scss';

const Notifications: React.FC = () => {
  const { notifications, notificationsDataStatus } = useAppSelector(({ notification }: RootState) => ({
    notifications: notification.notifications,
    notificationsDataStatus: notification.notificationsDataStatus,
  }));

  const dispatch = useDispatch();

  const hasNotificaions = Boolean(notifications.length);
  const isLoading = notificationsDataStatus === DataStatus.PENDING;

  const handleChangeNotificationStatus = (payload: UserNotification): void => {
    dispatch(notificationAction.changeStatus(payload));
  };

  useEffect(() => {
    dispatch(notificationAction.loadCurrentUserNotifications());
  }, []);

  useEffect(() => {
    dispatch(notificationAction.getCountUncheckedUserNotifications());
  }, [notifications]);

  if (isLoading) {
    return <Loader />;
  }

  return hasNotificaions ? (
    <ul className={styles.container}>
      {notifications.map((notification) => (
        <NotificationItem
          notification={notification}
          key={notification.id}
          onChangeStatus={handleChangeNotificationStatus}
        />
      ))}
    </ul>
  ) : (
    <div className={styles.containerUserNotFound}>
      <h1>You haven`t received any notifications yet.</h1>
    </div>
  );
};

export default Notifications;
