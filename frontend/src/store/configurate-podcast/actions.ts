import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  Podcast,
  PodcastCreatePayload,
  PodcastEditActionPayloadType,
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

const edit = createAsyncThunk<Podcast, PodcastEditActionPayloadType, AsyncThunkConfig>
(ActionType.EDIT_PODCAST, async ( { id, payload }, { extra }) => {
  const { podcastApi } = extra;
  const podcast = await podcastApi.edit(id, payload);

  return podcast;
});

const loadPodcast = createAsyncThunk<Podcast, number, AsyncThunkConfig>
(ActionType.LOAD_PODCAST, async (id, { extra }) => {
  const { podcastApi } = extra;
  const podcast = await podcastApi.getById(id);

  return podcast;
});

export { create, edit, loadPodcast };
