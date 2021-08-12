import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDataUrl, getFileFromFileList } from 'helpers/helpers';
import {
  AsyncThunkConfig,
  Podcast,
  PodcastFormPayload,
  User,
} from 'common/types/types';
import { ActionType } from './common';
import { NotificationMessage, NotificationTitle } from 'common/enums/enums';

const create = createAsyncThunk<Podcast, PodcastFormPayload, AsyncThunkConfig>(
  ActionType.CREATE_PODCAST,
  async (podcastPayload, { getState, extra }) => {
    const { podcastApi, notificationService } = extra;
    const { auth } = getState();
    const file = getFileFromFileList(podcastPayload.image);
    notificationService.success(NotificationTitle.SUCCESS, `The podcast ${NotificationMessage.SUCCESS_CREATED}`);

    return podcastApi.create({
      userId: (<User>auth.user).id,
      description: podcastPayload.description,
      name: podcastPayload.name,
      type: podcastPayload.type,
      imageDataUrl: file ? await getDataUrl(file) : null,
    });
  },
);

const edit = createAsyncThunk<Podcast, PodcastFormPayload, AsyncThunkConfig>(
  ActionType.EDIT_PODCAST,
  async (podcastPayload, { getState, extra }) => {
    const { podcastApi, notificationService } = extra;
    const { auth, configuratePodcast } = getState();
    const file = getFileFromFileList(podcastPayload.image);
    const { id, imageId } = <Podcast>configuratePodcast.podcast;

    const podcast = await podcastApi.update(id, {
      userId: (<User>auth.user).id,
      name: podcastPayload.name,
      description: podcastPayload.description,
      type: podcastPayload.type,
      imageId: imageId,
      imageDataUrl: file ? await getDataUrl(file) : null,
    });

    notificationService.success(NotificationTitle.SUCCESS, `The podcast ${NotificationMessage.SUCCESS_UPDATED}`);

    return podcast;
  });

const loadPodcast = createAsyncThunk<Podcast, number, AsyncThunkConfig>
(ActionType.LOAD_PODCAST, async (id, { extra }) => {
  const { podcastApi } = extra;
  const podcast = await podcastApi.getById(id);

  return podcast;
});

export { create, edit, loadPodcast };
