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

const edit = createAsyncThunk<Podcast | null, PodcastCreatePayload, AsyncThunkConfig>
(ActionType.EDIT_PODCAST, async ( payload, { getState, extra }) => {
  const { configuratePodcast } = getState();
  const { podcastApi } = extra;
  if(configuratePodcast.podcast){
    const payloadPodcast = {
      ...configuratePodcast.podcast,
      ...payload,
    };
    const podcast = await podcastApi.edit(payloadPodcast);

    return podcast;
  }
  return null;
});

const loadPodcast = createAsyncThunk<Podcast, number, AsyncThunkConfig>
(ActionType.LOAD_PODCAST, async (id, { extra }) => {
  const { podcastApi } = extra;
  const podcast = await podcastApi.getById(id);

  return podcast;
});

export { create, edit, loadPodcast };
