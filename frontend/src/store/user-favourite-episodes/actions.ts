import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, UserFavouriteEpisodeResponse, LoadFavouriteEpisodesPayload } from 'common/types/types';
import { ActionType } from './common';

const loadFavouriteEpisodes = createAsyncThunk<UserFavouriteEpisodeResponse, LoadFavouriteEpisodesPayload, AsyncThunkConfig>(
  ActionType.LOAD_FAVOURITE_EPISODES,
  async (payload, { extra }) => {
    const { episodeApi } = extra;

    return await episodeApi.getFavoriteEpisodesByUserId(payload);
  },
);

export { loadFavouriteEpisodes };
