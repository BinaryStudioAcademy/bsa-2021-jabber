import { createAsyncThunk } from '@reduxjs/toolkit';
import { Podcast, AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';

const loadPodcasts = createAsyncThunk<Podcast[], undefined, AsyncThunkConfig>
(ActionType.LOAD_PODCASTS, async (args: undefined, { extra }) => {
  const { podcastApi } = extra;
  const podcasts = await podcastApi.getAll();

  return podcasts;
});

export { loadPodcasts };
