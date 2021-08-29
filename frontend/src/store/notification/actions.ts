import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, UserNotification } from 'common/types/types';
import { ActionType } from './common';

const loadCurrentUserNotifications = createAsyncThunk<UserNotification[], undefined, AsyncThunkConfig>
(ActionType.LOAD_CURRENT_USER_NOTIFICATION, async (id, { extra }) => {
  const { userNotificationApi } = extra;
  const notifications = await userNotificationApi.getAllById();

  return notifications;
});

const changeStatus = createAsyncThunk<UserNotification, number, AsyncThunkConfig>
(ActionType.CHANGE_STATUS, async (id, { extra }) => {
  const { userNotificationApi } = extra;
  const notification = await userNotificationApi.changeNotificationStatus(id);

  return notification;
});

export { loadCurrentUserNotifications, changeStatus };
