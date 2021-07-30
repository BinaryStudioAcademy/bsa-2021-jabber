import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  Podcast,
  PodcastCreatePayload,
} from 'common/types/types';
import { ActionType } from './common';

const create = createAsyncThunk<Promise<Podcast>, PodcastCreatePayload, AsyncThunkConfig>
(ActionType.POST_PODCAST, async (podcastPayload, { extra }) => {
  const { podcastApi } = extra;
  const podcast = await podcastApi.create(podcastPayload);

  return podcast;
});

export { create };
