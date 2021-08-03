import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDataUrl } from 'helpers/helpers';
import {
  AsyncThunkConfig,
  Podcast,
  PodcastFormPayload,
  User,
} from 'common/types/types';
import { ActionType } from './common';

const create = createAsyncThunk<Podcast, PodcastFormPayload, AsyncThunkConfig>(
  ActionType.CREATE_PODCAST,
  async (podcastPayload, { getState, extra }) => {
    const { podcastApi } = extra;
    const { auth } = getState();
    const [file] = podcastPayload.image ?? [];

    return podcastApi.create({
      userId: (<User>auth.user).id,
      description: podcastPayload.description,
      name: podcastPayload.name,
      imageDataUrl: file ? await getDataUrl(file) : null,
    });
  },
);

const edit = createAsyncThunk<Podcast | null, PodcastFormPayload, AsyncThunkConfig>
(ActionType.EDIT_PODCAST, async ( podcastPayload, { getState, extra }) => {
  const { configuratePodcast } = getState();
  const { podcastApi } = extra;
  if(configuratePodcast.podcast){
    const payloadPodcast = {
      ...configuratePodcast.podcast,
      ...podcastPayload,
      image: null,
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
