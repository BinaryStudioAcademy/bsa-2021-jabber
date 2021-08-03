import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  Podcast,
  PodcastCreatePayload,
} from 'common/types/types';
import { ActionType } from './common';

const create = createAsyncThunk<Podcast, PodcastCreatePayload, AsyncThunkConfig>
(ActionType.CREATE_PODCAST, async (podcastPayload, { extra }) => {
  const { podcastApi } = extra;
  const podcast = await podcastApi.create(podcastPayload);

  return podcast;
});

export { create };
