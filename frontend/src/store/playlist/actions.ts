import { createAsyncThunk } from '@reduxjs/toolkit';
import { Playlist, AsyncThunkConfig, LoadPlaylistEpisodesPayload, PlaylistEpisodeResponse } from 'common/types/types';
import { ActionType } from './common';

const loadById = createAsyncThunk<Playlist, number, AsyncThunkConfig>(
  ActionType.LOAD_PLAYLIST, async (id, { extra }) => {
    const { playlistApi } = extra;
    const playlist = await playlistApi.getById(id);

    return playlist;
  });

const loadEpisodesByPlaylistId = createAsyncThunk<PlaylistEpisodeResponse, LoadPlaylistEpisodesPayload, AsyncThunkConfig>(
  ActionType.LOAD_PLAYLIST_EPISODES, async (id, { extra }) => {
    const { episodeApi } = extra;
    const result = await episodeApi.getByQueryByPlaylistId(id);

    return result;
  });

export { loadById, loadEpisodesByPlaylistId };
