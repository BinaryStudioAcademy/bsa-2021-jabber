import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';

const getCountUncheckedUserNotifications = createAsyncThunk<number, undefined, AsyncThunkConfig>
(ActionType.GET_COUNT_USER_NOTIFICATION, async (_arg, { extra }) => {
  const { userNotificationApi } = extra;
  const count = await userNotificationApi.getCountUncheckedById();

  return count;
});

export { getCountUncheckedUserNotifications };
