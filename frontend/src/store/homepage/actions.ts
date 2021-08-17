import { createAsyncThunk } from '@reduxjs/toolkit';
import { Podcast, AsyncThunkConfig, PodcastSearchPayload } from 'common/types/types';
import { ActionType } from './common';

const loadPodcasts = createAsyncThunk<Podcast[], undefined, AsyncThunkConfig>
(ActionType.LOAD_PODCASTS, async (_args, { extra }) => {
  const { podcastApi } = extra;
  const podcasts = await podcastApi.getAll();

  return podcasts;
});

const loadPodcastsBySearch = createAsyncThunk<Podcast[], PodcastSearchPayload, AsyncThunkConfig>
(ActionType.LOAD_PODCASTS_BY_SEARCH, async (searchValues, { extra }) => {
  const { podcastApi } = extra;
  console.warn(searchValues);
  const podcasts = await podcastApi.getAllBySearch(searchValues);

  return podcasts;
});

export {
  loadPodcasts,
  loadPodcastsBySearch,
};
