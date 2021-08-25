import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  PodcastQueryPayload,
  AsyncThunkConfig,
  PodcastLoadFilter,
  User,
  UserPopularLoadFilter,
  Genre,
} from 'common/types/types';
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

const loadPopularUsers = createAsyncThunk<User[], UserPopularLoadFilter, AsyncThunkConfig>
(ActionType.LOAD_POPULAR_USERS, async (filter, { extra }) => {
  const { userApi } = extra;
  const popularUsers = await userApi.getPopular(filter);

  return popularUsers;
});

const loadGenres = createAsyncThunk<Genre[], undefined, AsyncThunkConfig>
(ActionType.LOAD_GENRES, async (_args, { extra }) => {
  const { genreApi } = extra;
  const genres = await genreApi.getAll();

  return genres;
});

export {
  loadPodcasts,
  loadMorePodcasts,
  loadPopularUsers,
  loadGenres,
};
