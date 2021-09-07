import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Playlist,
  User,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const loadPlaylists = createAsyncThunk<Playlist[], number, AsyncThunkConfig>(
  ActionType.LOAD_PLAYLISTS,
  async (userId, { extra }) => {
    const { playlistApi } = extra;
    const playlist = await playlistApi.getAllByUserId(userId);

    return playlist;
  },
);

const loadPlaylistsOwner = createAsyncThunk<User, number, AsyncThunkConfig>(
  ActionType.LOAD_PLAYLISTS_OWNER,
  async (userId, { extra }) => {
    const { userApi } = extra;

    return await userApi.getById(userId);
  },
);

export { loadPlaylists, loadPlaylistsOwner };
