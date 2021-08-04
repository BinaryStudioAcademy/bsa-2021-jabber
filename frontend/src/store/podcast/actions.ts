import { createAsyncThunk } from '@reduxjs/toolkit';
import { Podcast, AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';

const loadPodcast = createAsyncThunk<Podcast, number, AsyncThunkConfig>
(ActionType.LOAD_PODCAST, async (id, { extra }) => {
  const { podcastApi } = extra;
  const podcast = await podcastApi.getById(id);

  return podcast;
});

export { loadPodcast };
