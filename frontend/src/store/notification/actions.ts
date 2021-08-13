import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, UserNotification } from 'common/types/types';
import { ActionType } from './common';

const loadNotifications = createAsyncThunk<UserNotification[], number, AsyncThunkConfig>
(ActionType.LOAD_NOTIFICATION, async (id, { extra }) => {
  const { userNotificationApi } = extra;
  const notifications = await userNotificationApi.getAllById(id);

  return notifications;
},
);

export { loadNotifications };
