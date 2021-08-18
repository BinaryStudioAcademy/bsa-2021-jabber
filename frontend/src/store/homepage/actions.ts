import { createAsyncThunk } from '@reduxjs/toolkit';
import { Podcast, AsyncThunkConfig, PodcastLoadFilter } from 'common/types/types';
import { ActionType } from './common';

const loadPodcasts = createAsyncThunk<Podcast[], PodcastLoadFilter, AsyncThunkConfig>
(ActionType.LOAD_PODCASTS, async (podcastsFilter, { extra }) => {
  const { podcastApi } = extra;
  const podcasts = await podcastApi.getByQuery(podcastsFilter);

  return podcasts;
});

const loadMorePodcasts = createAsyncThunk<Podcast[], PodcastLoadFilter, AsyncThunkConfig>
(ActionType.LOAD_MORE_PODCASTS, async (podcastsFilter, { extra }) => {
  const { podcastApi } = extra;
  const podcasts = await podcastApi.getByQuery(podcastsFilter);

  return podcasts;
});

export {
  loadPodcasts,
  loadMorePodcasts,
};
