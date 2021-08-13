import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, User } from 'common/types/types';
import { ActionType } from './common';

const loadNotification = createAsyncThunk<User, number, AsyncThunkConfig>(
  ActionType.LOAD_NOTIFICATION,
  async (id, { extra }) => {
    const { userApi } = extra;
    const user = await userApi.getById(id);

    return user;
  },
);

export { loadNotification };
