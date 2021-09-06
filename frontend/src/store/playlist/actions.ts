import { createAsyncThunk } from '@reduxjs/toolkit';
import { Playlist, User, AsyncThunkConfig, EpisodeWithPodcast } from 'common/types/types';
import { ActionType } from './common';

const loadById = createAsyncThunk<Playlist, number, AsyncThunkConfig>(
  ActionType.LOAD_PLAYLIST, async (id, { extra }) => {
    const { playlistApi } = extra;
    const playlist = await playlistApi.getById(id);

    return playlist;
  });

const loadEpisodesByPlaylistId = createAsyncThunk<EpisodeWithPodcast[], number, AsyncThunkConfig>(
  ActionType.LOAD_PLAYLIST_EPISODES, async (id, { extra }) => {
    const { episodeApi } = extra;
    const result = await episodeApi.getByPlaylistId(id);

    return result;
  });

const loadPlaylists = createAsyncThunk<Playlist[], number, AsyncThunkConfig>(
  ActionType.LOAD_PLAYLISTS,
  async (userId, { extra }) => {
    const { playlistApi } = extra;
    const playlist = await playlistApi.getAllByUserId(userId);

    return playlist;
  },
);

const loadPlaylistsOwner = createAsyncThunk<User, number, AsyncThunkConfig>(
  ActionType.LOAD_PLAYLIST_OWNER,
  async (userId, { extra }) => {
    const { userApi } = extra;

    return await userApi.getById(userId);
  },
);

export { loadById, loadEpisodesByPlaylistId, loadPlaylists, loadPlaylistsOwner };
