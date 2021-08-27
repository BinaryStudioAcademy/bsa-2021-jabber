import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, UserFollower } from 'common/types/types';
import { ActionType } from './common';

const loadFollowersByUserId = createAsyncThunk<UserFollower[], number, AsyncThunkConfig>(
  ActionType.LOAD_FOLLOWERS_BY_USER_ID,
  async (userId, { extra }) => {
    const { userFollowerApi } = extra;
    const followers = await userFollowerApi.getAllByUserId(userId);
    // eslint-disable-next-line no-console
    console.log('followers', followers);
    return  followers;
  },
);

export { loadFollowersByUserId };
