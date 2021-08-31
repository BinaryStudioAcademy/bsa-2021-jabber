import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataUrl, getFileFromFileList } from 'helpers/helpers';
import {
  AsyncThunkConfig,
  DeleteActionPodcastPayload,
  Genre,
  Podcast,
  PodcastFormPayload,
  User,
  ConfigurationPodcastPayload,
} from 'common/types/types';
import { ActionType } from './common';
import { AppRoute, NotificationMessage, NotificationTitle, PodcastType } from 'common/enums/enums';

const create = createAsyncThunk<void, PodcastFormPayload, AsyncThunkConfig>(
  ActionType.CREATE_PODCAST,
  async (podcastPayload, { getState, extra }) => {
    const { podcastApi, notificationService, navigationService } = extra;
    const { auth } = getState();
    const file = getFileFromFileList(podcastPayload.image);
    const coverFile = getFileFromFileList(podcastPayload.cover);

    const podcast = await podcastApi.create({
      userId: (<User>auth.user).id,
      description: podcastPayload.description,
      genreId: Number(podcastPayload.genre),
      name: podcastPayload.name,
      type: podcastPayload.type,
      imageDataUrl: file ? await getDataUrl(file) : null,
      coverDataUrl: coverFile ? await getDataUrl(coverFile) : null,
      periodicity: podcastPayload.periodicity,
      invitationCode: podcastPayload.invitationCode,
    });

    notificationService.success(NotificationTitle.SUCCESS, NotificationMessage.PODCAST_CREATED);

    navigationService.push(`${AppRoute.PODCASTS}/${podcast.id}`);
  },
);

const edit = createAsyncThunk<void, PodcastFormPayload, AsyncThunkConfig>(
  ActionType.EDIT_PODCAST,
  async (podcastPayload, { getState, extra }) => {
    const { podcastApi, notificationService, navigationService } = extra;
    const { auth, configuratePodcast } = getState();
    const file = getFileFromFileList(podcastPayload.image);
    const coverFile = getFileFromFileList(podcastPayload.cover);
    const { id, imageId, coverId } = <Podcast>configuratePodcast.podcast;

    const podcast = await podcastApi.update(id, {
      userId: (<User>auth.user).id,
      name: podcastPayload.name,
      description: podcastPayload.description,
      type: podcastPayload.type,
      imageId: imageId,
      imageDataUrl: file ? await getDataUrl(file) : null,
      coverId: coverId,
      coverDataUrl: coverFile ? await getDataUrl(coverFile) : null,
      genreId: Number(podcastPayload.genre),
      periodicity: podcastPayload.periodicity,
      invitationCode: podcastPayload.invitationCode,
    });

    notificationService.success(NotificationTitle.SUCCESS, NotificationMessage.PODCAST_UPDATED);

    navigationService.push(`${AppRoute.PODCASTS}/${podcast.id}`);
  });

const loadPodcast = createAsyncThunk<ConfigurationPodcastPayload, number, AsyncThunkConfig>
(ActionType.LOAD_PODCAST, async (id, { extra }) => {
  const { podcastApi } = extra;
  const podcast = await podcastApi.getById(id);
  const invitationCode = podcast.type === PodcastType.PRIVATE
    ? await podcastApi.invitationCode(id)
    : '';

  const podcastPayload = {
    ...podcast,
    invitationCode: invitationCode,
  };

  return podcastPayload;
});

const loadGenres = createAsyncThunk<Genre[], undefined, AsyncThunkConfig>
(ActionType.LOAD_GENRES, async (_args, { extra }) => {
  const { genreApi } = extra;
  const genres = await genreApi.getAll();

  return genres;
});

const deletePodcast = createAsyncThunk<void, DeleteActionPodcastPayload, AsyncThunkConfig>(
  ActionType.DELETE_PODCAST,
  async ({ podcastId, userId }, { extra }) => {
    const { podcastApi, notificationService, navigationService } = extra;
    await podcastApi.delete(podcastId);

    notificationService.success(NotificationTitle.SUCCESS, NotificationMessage.PODCAST_DELETED);
    navigationService.push(`${AppRoute.USERS}/${userId}`);
  });

const resetState = createAction(ActionType.RESET_STATE);

export { create, edit, loadPodcast, loadGenres, deletePodcast, resetState };
