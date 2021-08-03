import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Episode,
  AsyncThunkConfig,
  EpisodeCreatePayload,
  User,
} from 'common/types/types';
import { ActionType } from './common';

const createEpisode = createAsyncThunk<Episode, EpisodeCreatePayload, AsyncThunkConfig>
(ActionType.CREATE_EPISODE, async (createEpisodePayload, { getState, extra }) => {
  const { episodeApi } = extra;
  const { auth } = getState();
  const episodes = await episodeApi.create({
    ...createEpisodePayload,
    userId: (<User>auth.user).id,
  });

  return episodes;
});

export { createEpisode };
