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
      shownotes: createEpisodePayload.shownotes,
      podcastId: DEFAULT_PODCAST_ID,
      type: createEpisodePayload.type,
      userId: (<User>auth.user).id,
      recordDataUrl: file ? await getDataUrl(file) : null,
    });

    return episodes;
  },
);

export { createEpisode };
