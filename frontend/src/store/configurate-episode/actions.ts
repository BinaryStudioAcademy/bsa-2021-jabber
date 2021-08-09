import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Episode,
  AsyncThunkConfig,
  EpisodeFormPayload,
  User,
} from 'common/types/types';
import { ActionType } from './common';
import { getFileFromFileList, getDataUrl } from 'helpers/helpers';
import { DEFAULT_PODCAST_ID } from 'common/constants/constants';

const createEpisode = createAsyncThunk<Episode, EpisodeFormPayload, AsyncThunkConfig>(
  ActionType.CREATE_EPISODE,
  async (createEpisodePayload, { getState, extra }) => {
    const { episodeApi } = extra;
    const { auth } = getState();
    const file = getFileFromFileList(createEpisodePayload.record);
    const episodes = await episodeApi.create({
      name: createEpisodePayload.name,
      description: createEpisodePayload.description,
      podcastId: DEFAULT_PODCAST_ID,
      type: createEpisodePayload.type,
      userId: (<User>auth.user).id,
      recordDataUrl: file ? await getDataUrl(file) : null,
    });

    return episodes;
  });

const editEpisode = createAsyncThunk<Episode, EpisodeFormPayload, AsyncThunkConfig>(
  ActionType.EDIT_EPISODE,
  async (editEpisodePayload, { getState, extra }) => {
    const { episodeApi } = extra;
    const { configurateEpisode } = getState();
    const { id } = <Episode>configurateEpisode.episode;
    const file = getFileFromFileList(editEpisodePayload.record);

    const episode = await episodeApi.update(id, {
      name: editEpisodePayload.name,
      description: editEpisodePayload.description,
      type: editEpisodePayload.type,
      recordDataUrl: file ? await getDataUrl(file) : null,
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
