import { createAsyncThunk } from '@reduxjs/toolkit';
import { Podcast, AsyncThunkConfig, Episode } from 'common/types/types';
import { ActionType } from './common';

const loadPodcast = createAsyncThunk<Podcast, number, AsyncThunkConfig>(
  ActionType.LOAD_PODCAST,
  async (id, { extra }) => {
    const { podcastApi } = extra;
    const podcast = await podcastApi.getById(id);

    return podcast;
  },
);

const loadEpisodesByPodcastId = createAsyncThunk<Episode[], number, AsyncThunkConfig>
(ActionType.LOAD_PODCAST_EPISODES, async (id, { extra }) => {
  const { episodeApi } = extra;
  const episodes = await episodeApi.getAllByPodcastId(id);

  return episodes;
});

export { loadPodcast, loadEpisodesByPodcastId };
