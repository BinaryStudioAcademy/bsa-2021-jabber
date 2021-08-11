import { createAsyncThunk } from '@reduxjs/toolkit';
import { Podcast, AsyncThunkConfig, User } from 'common/types/types';
import { ActionType } from './common';

const loadPodcasts = createAsyncThunk<Podcast[], undefined, AsyncThunkConfig>
(ActionType.LOAD_PODCASTS, async (_args, { getState, extra }) => {
  const { podcastApi } = extra;
  const { auth } = getState();
  const podcasts = await podcastApi.getAllByUserId((<User>auth.user).id);

  return podcasts;
});

export { loadPodcasts };
