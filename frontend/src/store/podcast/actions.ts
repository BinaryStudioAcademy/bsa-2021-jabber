import { createAsyncThunk } from '@reduxjs/toolkit';
import { Podcast, AsyncThunkConfig, EpisodeQueryPayload, PodcastFollowerPayload, LoadEpisodesByPodcastIdPayload } from 'common/types/types';
import { ActionType } from './common';

const loadPodcast = createAsyncThunk<Podcast, number, AsyncThunkConfig>(
  ActionType.LOAD_PODCAST,
  async (id, { extra }) => {
    const { podcastApi } = extra;
    const podcast = await podcastApi.getById(id);

    return podcast;
  },
);

const loadEpisodesByPodcastId = createAsyncThunk<EpisodeQueryPayload, LoadEpisodesByPodcastIdPayload, AsyncThunkConfig>(
  ActionType.LOAD_PODCAST_EPISODES, async (loadEpisodesByPodcastIdPayload, { extra }) => {
    const { episodeApi } = extra;
    const result = await episodeApi.getByQueryByPodcastId(loadEpisodesByPodcastIdPayload);

    return result;
  });

const getFollowersCount = createAsyncThunk<number, number, AsyncThunkConfig>(
  ActionType.GET_FOLLOWERS_COUNT,
  async (podcastId, { extra }) => {
    const { podcastFollowerApi } = extra;
    return await podcastFollowerApi.getCountByPodcastId(podcastId);
  });

const checkIsFollowedPodcast = createAsyncThunk<boolean, PodcastFollowerPayload, AsyncThunkConfig>(
  ActionType.CHECK_IS_FOLLOWED_PODCAST,
  async (payload, { extra }) => {
    const { podcastFollowerApi } = extra;

    return await podcastFollowerApi.checkIsFollowed(payload);
  },
);

const toggleFollowPodcast = createAsyncThunk<boolean, PodcastFollowerPayload, AsyncThunkConfig>(
  ActionType.TOGGLE_FOLLOW_PODCAST,
  async (payload, { extra, getState }) => {
    const { podcastFollowerApi } = extra;
    const { podcast } = getState();

    if (podcast.isFollowed) {
      await podcastFollowerApi.delete(payload);
      return false;
    }

    await podcastFollowerApi.create(payload);
    return true;
  },
);

export { loadPodcast, loadEpisodesByPodcastId, getFollowersCount, checkIsFollowedPodcast, toggleFollowPodcast };
