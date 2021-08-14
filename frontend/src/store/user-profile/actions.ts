import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationMessage, NotificationTitle } from 'common/enums/enums';
import {
  Podcast,
  AsyncThunkConfig,
  User,
  UserEditPayload,
} from 'common/types/types';
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

const updateUser = createAsyncThunk<User, UserEditPayload, AsyncThunkConfig>(
  ActionType.UPDATE_USER,
  async (payload, { extra, getState }) => {
    const { userApi, notificationService } = extra;
    const { auth } = getState();

    const updatedUser = await userApi.update((<User>auth.user).id, payload);

    notificationService.success(
      NotificationTitle.SUCCESS,
      NotificationMessage.USER_UPDATED,
    );

    return updatedUser;
  },
);

export { loadPodcasts, loadUser, updateUser };
