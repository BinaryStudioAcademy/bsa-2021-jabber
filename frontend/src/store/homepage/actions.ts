import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { PodcastQueryPayload, AsyncThunkConfig, PodcastLoadFilter, Genre } from 'common/types/types';
import { ActionType } from './common';

const loadPodcasts = createAsyncThunk<PodcastQueryPayload, PodcastLoadFilter, AsyncThunkConfig>
(ActionType.LOAD_PODCASTS, async (podcastsFilter, { extra }) => {
  const { podcastApi } = extra;
  const podcasts = await podcastApi.getByQuery(podcastsFilter);

  return podcasts;
});

const loadMorePodcasts = createAsyncThunk<PodcastQueryPayload, PodcastLoadFilter, AsyncThunkConfig>
(ActionType.LOAD_MORE_PODCASTS, async (podcastsFilter, { extra }) => {
  const { podcastApi } = extra;
  const podcasts = await podcastApi.getByQuery(podcastsFilter);

  return podcasts;
});

const loadGenres = createAsyncThunk<Genre[], undefined, AsyncThunkConfig>
(ActionType.LOAD_GENRES, async (_args, { extra }) => {
  const { genreApi } = extra;
  const genres = await genreApi.getAll();

  return genres;
});

const leaveHomepage = createAction(ActionType.LEAVE_HOMEPAGE);

export {
  loadPodcasts,
  loadMorePodcasts,
  loadGenres,
  leaveHomepage,
};
