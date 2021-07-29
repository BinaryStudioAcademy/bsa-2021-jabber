import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';

const postPodcast = createAsyncThunk<Promise<any>, any, AsyncThunkConfig>(
  ActionType.POST_PODCAST,
  async (podcastPayload, { extra }) => {
    const { podcastApi } = extra;
    const podcast = await podcastApi.postPodcast(podcastPayload);

    return podcast;
  },
);

export { postPodcast };
