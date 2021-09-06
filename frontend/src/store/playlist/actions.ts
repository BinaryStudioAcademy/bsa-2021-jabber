import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  Playlist,
  User,
} from 'common/types/types';
import { ActionType } from './common';
import { AppRoute, NotificationTitle } from 'common/enums/enums';

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

const playlistInvite = createAsyncThunk<void, string, AsyncThunkConfig>(
  ActionType.PLAYLIST_INVITE,
  async (code, { extra }) => {
    const { playlistApi, navigationService, notificationService } = extra;

    try {
      const playlist = await playlistApi.invite(code);

      navigationService.push(`${AppRoute.PLAYLISTS}/${playlist.id}`);
    } catch (err) {
      navigationService.push(`${AppRoute.ROOT}`);
      notificationService.error(NotificationTitle.ERROR, err.message);
    }

  });

export { loadPlaylists, loadPlaylistsOwner, playlistInvite };
