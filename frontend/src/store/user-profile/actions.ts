import { createAsyncThunk } from '@reduxjs/toolkit';
import { Podcast, AsyncThunkConfig, User, UserFollowerPayload } from 'common/types/types';
import { ActionType } from './common';

const loadPodcasts = createAsyncThunk<Podcast[], number, AsyncThunkConfig>(
  ActionType.LOAD_PODCASTS,
  async (id, { extra }) => {
    const { podcastApi } = extra;
    const podcasts = await podcastApi.getAllByUserId(id);

    return podcasts;
  },
);

const loadUser = createAsyncThunk<User, number, AsyncThunkConfig>(
  ActionType.LOAD_USER,
  async (id, { extra }) => {
    const { userApi } = extra;
    const user = await userApi.getById(id);

    return user;
  },
);

const getFollowersCount = createAsyncThunk<number, number, AsyncThunkConfig>(
  ActionType.GET_FOLLOWERS_COUNT,
  async (userId, { extra }) => {
    const { userFollowerApi } = extra;
    return await userFollowerApi.getCountByUserId(userId);
  });

const checkIsFollowedUser = createAsyncThunk<boolean, UserFollowerPayload, AsyncThunkConfig>(
  ActionType.CHECK_IS_FOLLOWED_USER,
  async (payload, { extra }) => {
    const { userFollowerApi } = extra;

    return await userFollowerApi.checkIsFollowed(payload);
  },
);

const toggleFollowUser = createAsyncThunk<boolean, UserFollowerPayload, AsyncThunkConfig>(
  ActionType.TOGGLE_FOLLOW_USER,
  async (payload, { extra, getState }) => {
    const { userFollowerApi } = extra;
    const { userProfile } = getState();

    if (userProfile.isFollowed) {
      await userFollowerApi.delete(payload);
      return false;
    }

    await userFollowerApi.create(payload);
    return true;
  },
);

const loadFollowersByUserId = createAsyncThunk<User[], number, AsyncThunkConfig>(
  ActionType.LOAD_FOLLOWERS_BY_USER_ID,
  async (userId, { extra }) => {
    const { userApi } = extra;
    const followers = await userApi.getFollowers(userId);
    return  followers;
  },
);

export { loadPodcasts, loadUser, getFollowersCount, checkIsFollowedUser, toggleFollowUser, loadFollowersByUserId };
