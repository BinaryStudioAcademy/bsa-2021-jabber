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

const isFollowedUser = createAsyncThunk<boolean, UserFollowerPayload, AsyncThunkConfig>(
  ActionType.IS_FOLLOWED_USER,
  async (payload, { extra }) => {
    const { userFollowerApi } = extra;
    const userFollower = await userFollowerApi.isFollowed(payload);

    if (userFollower) {
      return true;
    }

    return false;
  },
);

const followUser = createAsyncThunk<void, UserFollowerPayload, AsyncThunkConfig>(
  ActionType.FOLLOW_USER,
  async (payload, { extra }) => {
    const { userFollowerApi } = extra;
    await userFollowerApi.create(payload);
  },
);

const unfollowUser = createAsyncThunk<void, UserFollowerPayload, AsyncThunkConfig>(
  ActionType.UNFOLLOW_USER,
  async (payload, { extra }) => {
    const { userFollowerApi } = extra;
    await userFollowerApi.delete(payload);
  },
);

export { loadPodcasts, loadUser, getFollowersCount, isFollowedUser, followUser, unfollowUser };
