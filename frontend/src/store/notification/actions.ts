import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, UserNotification } from 'common/types/types';
import { ActionType } from './common';

const loadNotification = createAsyncThunk<UserNotification, number, AsyncThunkConfig>(
  ActionType.LOAD_NOTIFICATION,
  async (id, { extra }) => {
    const { userNotificationApi } = extra;
    const notifications = await userNotificationApi.getById(id);

    return notifications;
  },
);

export { loadNotification };
