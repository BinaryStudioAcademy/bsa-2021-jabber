import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Episode,
  AsyncThunkConfig,
  EpisodeFormPayload,
  User,
} from 'common/types/types';
import { getFileFromFileList, getDataUrl } from 'helpers/helpers';
import { ActionType } from './common';
import { DEFAULT_PODCAST_ID } from 'common/constants/constants';
import { NotificationMessage, NotificationTitle } from 'common/enums/enums';

const createEpisode = createAsyncThunk<Episode, EpisodeFormPayload, AsyncThunkConfig>(
  ActionType.CREATE_EPISODE,
  async (createEpisodePayload, { getState, extra }) => {
    const { episodeApi, notificationService } = extra;
    const { auth } = getState();

    const file = getFileFromFileList(createEpisodePayload.record);
    const imgFile = getFileFromFileList(createEpisodePayload.image);

    const episodes = await episodeApi.create({
      name: createEpisodePayload.name,
      description: createEpisodePayload.description,
      shownotes: createEpisodePayload.shownotes,
      podcastId: DEFAULT_PODCAST_ID,
      status: createEpisodePayload.status,
      type: createEpisodePayload.type,
      userId: (<User>auth.user).id,
      recordDataUrl: file ? await getDataUrl(file) : null,
      imageDataUrl: imgFile ? await getDataUrl(imgFile) : null,
    });

    notificationService.success(NotificationTitle.SUCCESS, `The episode ${NotificationMessage.SUCCESS_CREATED}`);
    return episodes;
  });

const editEpisode = createAsyncThunk<Episode, EpisodeFormPayload, AsyncThunkConfig>(
  ActionType.EDIT_EPISODE,
  async (editEpisodePayload, { getState, extra }) => {
    const { episodeApi } = extra;
    const { configurateEpisode, auth } = getState();
    const { id } = <Episode>configurateEpisode.episode;
    const recordfile = getFileFromFileList(editEpisodePayload.record);
    const imgFile = getFileFromFileList(editEpisodePayload.image);

    const episode = await episodeApi.update(id, {
      name: editEpisodePayload.name,
      description: editEpisodePayload.description,
      type: editEpisodePayload.type,
      recordDataUrl: recordfile ? await getDataUrl(recordfile) : null,
      imageDataUrl: imgFile ? await getDataUrl(imgFile) : null,
      userId: (<User>auth.user).id,
      imageId: (<Episode>configurateEpisode.episode).imageId,
      status: editEpisodePayload.status,
    });

    return episode;
  });

const loadEpisode = createAsyncThunk<Episode, number, AsyncThunkConfig>(
  ActionType.LOAD_EPISODE,
  async (id, { extra }) => {
    const { episodeApi } = extra;
    const episode = await episodeApi.getById(id);

    return episode;
  });

export { createEpisode, editEpisode, loadEpisode };
