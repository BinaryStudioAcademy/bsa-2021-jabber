import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDataUrl, getFileFromFileList } from 'helpers/helpers';
import {
  AsyncThunkConfig,
  Genre,
  Podcast,
  PodcastFormPayload,
  User,
} from 'common/types/types';
import { ActionType } from './common';
import { AppRoute, NotificationMessage, NotificationTitle } from 'common/enums/enums';

const create = createAsyncThunk<Podcast, PodcastFormPayload, AsyncThunkConfig>(
  ActionType.CREATE_PODCAST,
  async (podcastPayload, { getState, extra }) => {
    const { podcastApi, notificationService, navigationService } = extra;
    const { auth } = getState();
    const file = getFileFromFileList(podcastPayload.image);

    const podcast = await podcastApi.create({
      userId: (<User>auth.user).id,
      description: podcastPayload.description,
      genreId: Number(podcastPayload.genre),
      name: podcastPayload.name,
      type: podcastPayload.type,
      imageDataUrl: file ? await getDataUrl(file) : null,
    });

    notificationService.success(NotificationTitle.SUCCESS, NotificationMessage.PODCAST_CREATED);

    navigationService.push(`${AppRoute.PODCASTS}/${podcast.id}`);

    return podcast;
  },
);

const edit = createAsyncThunk<Podcast, PodcastFormPayload, AsyncThunkConfig>(
  ActionType.EDIT_PODCAST,
  async (podcastPayload, { getState, extra }) => {
    const { podcastApi, notificationService, navigationService } = extra;
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
      genreId: Number(podcastPayload.genre),
    });

    notificationService.success(NotificationTitle.SUCCESS, NotificationMessage.PODCAST_UPDATED);

    navigationService.push(`${AppRoute.PODCASTS}/${podcast.id}`);

    return podcast;
  });

const loadPodcast = createAsyncThunk<Podcast, number, AsyncThunkConfig>
(ActionType.LOAD_PODCAST, async (id, { extra }) => {
  const { podcastApi } = extra;
  const podcast = await podcastApi.getById(id);

  return podcast;
});

const loadGenres = createAsyncThunk<Genre[], undefined, AsyncThunkConfig>
(ActionType.LOAD_GENRES, async (_args, { extra }) => {
  const { genreApi } = extra;
  const genres = await genreApi.getAll();

  return genres;
});

export { create, edit, loadPodcast, loadGenres };
