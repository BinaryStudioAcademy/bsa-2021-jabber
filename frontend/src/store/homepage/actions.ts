import { createAsyncThunk } from '@reduxjs/toolkit';
import { Podcast, AsyncThunkConfig, PodcastSearchPayload, PodcastLoadFilter } from 'common/types/types';
import { ActionType } from './common';

const loadPodcasts = createAsyncThunk<Podcast[], PodcastLoadFilter, AsyncThunkConfig>
(ActionType.LOAD_PODCASTS, async (podcastsFilter, { extra }) => {
  const { podcastApi } = extra;
  const podcasts = await podcastApi.getAll(podcastsFilter);

  return podcasts;
});

const loadPodcastsBySearch = createAsyncThunk<Podcast[], PodcastSearchPayload, AsyncThunkConfig>
(ActionType.LOAD_PODCASTS_BY_SEARCH, async (searchValues, { extra }) => {
  const { podcastApi } = extra;
  const podcasts = await podcastApi.getAllBySearch(searchValues);

  return podcasts;
});

const loadMorePodcasts = createAsyncThunk<Podcast[], PodcastLoadFilter, AsyncThunkConfig>
(ActionType.LOAD_PODCASTS, async (podcastsFilter, { extra }) => {
  const { podcastApi } = extra;
  const podcasts = await podcastApi.getAll(podcastsFilter);

  return podcasts;
});

export {
  loadPodcasts,
  loadPodcastsBySearch,
  loadMorePodcasts,
};
