import { createAsyncThunk } from '@reduxjs/toolkit';
import { Episode, AsyncThunkConfig, EpisodeCreatePayload } from 'common/types/types';
import { ActionType } from './common';

const loadEpisode = createAsyncThunk<Episode, number, AsyncThunkConfig>
(ActionType.LOAD_EPISODE, async (id, { extra }) => {
  const { episodeApi } = extra;
  const episode = await episodeApi.getById(id);

  return episode;
});

const createEpisode = createAsyncThunk<Episode, EpisodeCreatePayload, AsyncThunkConfig>
(ActionType.CREATE_EPISODE, async (createEpisodePayload, { extra }) => {
  const { episodeApi } = extra;
  const episodes = await episodeApi.create(createEpisodePayload);

  return episodes;
});

export { loadEpisode, createEpisode };
