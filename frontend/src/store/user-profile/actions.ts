import { createAsyncThunk } from '@reduxjs/toolkit';
import { Podcast, AsyncThunkConfig, User } from 'common/types/types';
import { ActionType } from './common';

const loadPodcasts = createAsyncThunk<Podcast[], number, AsyncThunkConfig>
(ActionType.LOAD_PODCASTS, async (id, { extra }) => {
  const { podcastApi } = extra;
  const podcasts = await podcastApi.getAllByUserId(id);

  return podcasts;
});

const loadUser = createAsyncThunk<User, number, AsyncThunkConfig>
(ActionType.LOAD_USER, async (id, { extra }) => {
  const { userApi } = extra;
  const user = await userApi.getById(id);

  return user;
});

export { loadPodcasts, loadUser };
