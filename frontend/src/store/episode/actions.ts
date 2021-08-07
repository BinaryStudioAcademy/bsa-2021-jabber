import { createAsyncThunk } from '@reduxjs/toolkit';
import { Episode, AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';

const loadEpisode = createAsyncThunk<Episode, number, AsyncThunkConfig>
(ActionType.LOAD_EPISODE, async (id, { extra }) => {
  const { episodeApi } = extra;
  const episode = await episodeApi.getById(id);

  return episode;
});

const loadEpisodesByPodcastId = createAsyncThunk<Episode[], number, AsyncThunkConfig>
(ActionType.LOAD_EPISODES_BY_PODCAST_ID, async (id, { extra }) => {
  const { episodeApi } = extra;
  const episodes = await episodeApi.getByPodcastId(id);

  return episodes;
});

export { loadEpisode, loadEpisodesByPodcastId };
