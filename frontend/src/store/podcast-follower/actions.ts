import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, PodcastFollover } from 'common/types/types';
import { ActionType } from './common';

const loadPodcastFollower = createAsyncThunk<PodcastFollover[], number, AsyncThunkConfig>(
  ActionType.LOAD_PODCAST_FOLLOWER,
  async (payload, { extra }) => {
    const { podcastFollowerApi } = extra;

    return await podcastFollowerApi.getFollowerByPodcastId(payload);
  },
);

export { loadPodcastFollower };
