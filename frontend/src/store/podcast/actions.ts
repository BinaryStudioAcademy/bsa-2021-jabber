import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  Podcast,
  PodcastCreatePayload,
} from 'common/types/types';
import { ActionType } from './common';

// prettier-ignore
const postPodcast = createAsyncThunk<Promise<Podcast>, PodcastCreatePayload, AsyncThunkConfig>
(ActionType.POST_PODCAST, async (podcastPayload, { extra }) => {
  const { podcastApi } = extra;
  const podcast = await podcastApi.postPodcast(podcastPayload);

  return podcast;
});

export { postPodcast };
