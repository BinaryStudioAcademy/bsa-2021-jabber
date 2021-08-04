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
  const { podcastApi } = extra;
  const { configuratePodcast } = getState();
  const [file] = podcastPayload.image ?? [];
  /* eslint-disable no-console */
  console.log(configuratePodcast);
  /* eslint-enable no-console */
  if(configuratePodcast.podcast){
    const payloadEditPodcast = {
      id: configuratePodcast.podcast.id,
      name: podcastPayload.name,
      userId: configuratePodcast.podcast.userId,
      imageId: configuratePodcast.podcast.imageId,
      image: configuratePodcast.podcast.image,
      createdAt: configuratePodcast.podcast.createdAt,
      updatedAt: configuratePodcast.podcast.updatedAt,
      description: podcastPayload.description,
      imageDataUrl: file ? await getDataUrl(file) : null,
    };

    const podcast = await podcastApi.edit(payloadEditPodcast);

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
