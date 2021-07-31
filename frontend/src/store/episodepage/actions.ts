import { createAsyncThunk } from '@reduxjs/toolkit';
import { Episode, AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';

const loadEpisode = createAsyncThunk<Episode, number, AsyncThunkConfig>
(ActionType.LOAD_EPISODE, async (id, { extra }) => {
  const { episodeApi } = extra;
  const episode = await episodeApi.getById(id);

  return episode;
});

const loadEpisodes = createAsyncThunk<Episode[], undefined, AsyncThunkConfig>
(ActionType.LOAD_EPISODES, async (_args, { extra }) => {
  const { episodeApi } = extra;
  const episodes = await episodeApi.getAll();

  return episodes;
});

export { loadEpisode, loadEpisodes };
