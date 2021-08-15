import { createAsyncThunk } from '@reduxjs/toolkit';
import { Podcast, AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';
import { FieldValues, UnpackNestedValue } from 'react-hook-form';

const loadPodcasts = createAsyncThunk<Podcast[], undefined, AsyncThunkConfig>
(ActionType.LOAD_PODCASTS, async (_args, { extra }) => {
  const { podcastApi } = extra;
  const podcasts = await podcastApi.getAll();

  return podcasts;
});

const loadPodcastsBySearch = createAsyncThunk<Podcast[], UnpackNestedValue<FieldValues>, AsyncThunkConfig>
(ActionType.LOAD_PODCASTS_BY_SEARCH, async (searchValues, { extra }) => {
  const { podcastApi } = extra;
  const podcasts = await podcastApi.getAllBySearch(searchValues);

  return podcasts;
});

export {
  loadPodcasts,
  loadPodcastsBySearch,
};
