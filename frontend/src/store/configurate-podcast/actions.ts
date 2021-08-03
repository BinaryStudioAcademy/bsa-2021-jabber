import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  Podcast,
  PodcastCreatePayload,
  User,
} from 'common/types/types';
import { ActionType } from './common';

const create = createAsyncThunk<Podcast, PodcastCreatePayload, AsyncThunkConfig>
(ActionType.CREATE_PODCAST, async (podcastPayload, { getState, extra }) => {
  const { podcastApi } = extra;
  const { auth } = getState();
  const podcast = await podcastApi.create({
    ...podcastPayload,
    userId: (<User>auth.user).id,
  });

  return podcast;
});

export { create };
