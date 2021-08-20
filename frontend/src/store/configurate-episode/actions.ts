import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  CreateActionEpisodePayload,
  DeleteActionEpisodePayload,
  Episode,
  EpisodeFormPayload,
  User,
} from 'common/types/types';
import { getDataUrl, getFileFromFileList, mapToShownotePayload } from 'helpers/helpers';
import { ActionType } from './common';
import { AppRoute, NotificationMessage, NotificationTitle } from 'common/enums/enums';

const create = createAsyncThunk<void, CreateActionEpisodePayload, AsyncThunkConfig>(
  ActionType.CREATE_EPISODE,
  async (createEpisodePayload, { getState, extra }) => {
    const { episodeApi, notificationService, navigationService } = extra;
    const { auth } = getState();

    const file = getFileFromFileList(createEpisodePayload.record);
    const imgFile = getFileFromFileList(createEpisodePayload.image);

    const episode = await episodeApi.create({
      name: createEpisodePayload.name,
      description: createEpisodePayload.description,
      shownotes: createEpisodePayload.shownotes.map(mapToShownotePayload),
      podcastId: createEpisodePayload.podcastId,
      status: createEpisodePayload.status,
      type: createEpisodePayload.type,
      userId: (<User>auth.user).id,
      recordDataUrl: file ? await getDataUrl(file) : null,
      imageDataUrl: imgFile ? await getDataUrl(imgFile) : null,
    });

    notificationService.success(NotificationTitle.SUCCESS, NotificationMessage.EPISODE_CREATED);

    navigationService.push(`${AppRoute.EPISODES}/${episode.id}`);
  });

const edit = createAsyncThunk<void, EpisodeFormPayload, AsyncThunkConfig>(
  ActionType.EDIT_EPISODE,
  async (editEpisodePayload, { getState, extra }) => {
    const { episodeApi, navigationService, notificationService, recordAudioService } = extra;
    const { configurateEpisode, auth, record } = getState();
    const { id } = <Episode>configurateEpisode.episode;

    const recordFile = getFileFromFileList(editEpisodePayload.record);
    const imgFile = getFileFromFileList(editEpisodePayload.image);
    const liveRecord = await recordAudioService.getLiveRecord();

    const recordDataUrl = recordFile
      ? await getDataUrl(recordFile)
      : record.hasLiveRecord
        ? await getDataUrl(liveRecord)
        : null;

    const episode = await episodeApi.update(id, {
      name: editEpisodePayload.name,
      description: editEpisodePayload.description,
      shownotes: editEpisodePayload.shownotes.map(mapToShownotePayload),
      type: editEpisodePayload.type,
      recordDataUrl,
      imageDataUrl: imgFile ? await getDataUrl(imgFile) : null,
      userId: (<User>auth.user).id,
      imageId: (<Episode>configurateEpisode.episode).imageId,
      status: editEpisodePayload.status,
    });

    notificationService.success(NotificationTitle.SUCCESS, NotificationMessage.EPISODE_UPDATED);

    navigationService.push(`${AppRoute.EPISODES}/${episode.id}`);
  });

const loadEpisode = createAsyncThunk<Episode, number, AsyncThunkConfig>(
  ActionType.LOAD_EPISODE,
  async (id, { extra }) => {
    const { episodeApi } = extra;
    const episode = await episodeApi.getById(id);

    return episode;
  });

const deleteEpisode = createAsyncThunk<void, DeleteActionEpisodePayload, AsyncThunkConfig>(
  ActionType.DELETE_EPISODE,
  async ({ podcastId, episodeId }, { extra }) => {
    const { episodeApi, notificationService, navigationService } = extra;
    await episodeApi.delete(episodeId);

    notificationService.success(NotificationTitle.SUCCESS, NotificationMessage.EPISODE_DELETED);
    navigationService.push(`${AppRoute.PODCASTS}/${podcastId}`);
  });

export { create, edit, loadEpisode, deleteEpisode };
