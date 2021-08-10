import { createAsyncThunk } from '@reduxjs/toolkit';
import { Podcast, AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';

const loadPodcasts = createAsyncThunk<Podcast[], undefined, AsyncThunkConfig>
(ActionType.LOAD_PODCASTS, async (_args, { extra }) => {
  const { podcastApi } = extra;
  const podcasts = await podcastApi.getAll();

  return podcasts;
});

const searchPodcasts = createAsyncThunk<Podcast[], string, AsyncThunkConfig>
(ActionType.SEARCH_PODCASTS, async (title, { extra }) => {
  const { podcastApi } = extra;
  const podcasts = await podcastApi.getByTitle(title);

  return podcasts;
});

export {
  loadPodcasts,
  searchPodcasts,
};
