import { createAsyncThunk } from '@reduxjs/toolkit';
import { DEFAULT_PODCAST_ID } from 'common/constants/constants';
import {
  Episode,
  AsyncThunkConfig,
  EpisodeFormPayload,
  User,
} from 'common/types/types';
import { getFileFromFileList, getDataUrl } from 'helpers/helpers';
import { ActionType } from './common';

const createEpisode = createAsyncThunk<Episode, EpisodeFormPayload, AsyncThunkConfig>
(ActionType.CREATE_EPISODE,
  async (episodePayload, { getState, extra }) => {
    const { episodeApi } = extra;
    const { auth } = getState();
    const file = getFileFromFileList(episodePayload.image);

    const episode = await episodeApi.create({
      name: episodePayload.name,
      description: episodePayload.description,
      podcastId: DEFAULT_PODCAST_ID,
      type: episodePayload.type,
      userId: (<User>auth.user).id,
      imageDataUrl: file ? await getDataUrl(file) : null,
    });

    return episode;
  });

export { createEpisode };
