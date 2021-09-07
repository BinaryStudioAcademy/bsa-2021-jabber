import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Playlist,
  AsyncThunkConfig,
  EpisodeWithPodcast,
  DeleteActionPlaylistPayload,
} from 'common/types/types';
import { ActionType } from './common';
import { AppRoute, NotificationMessage, NotificationTitle } from 'common/enums/enums';

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

const deletePlaylist = createAsyncThunk<void, DeleteActionPlaylistPayload, AsyncThunkConfig>(
  ActionType.DELETE_PLAYLIST,
  async ({ playlistId, userId }, { extra }) => {
    const { playlistApi, notificationService, navigationService } = extra;
    await playlistApi.delete(playlistId);

    notificationService.success(NotificationTitle.SUCCESS, NotificationMessage.PLAYLIST_DELETED);
    navigationService.push(`${AppRoute.PLAYLISTS_USERS}/${userId}`);
  });

export { loadById, loadEpisodesByPlaylistId, deletePlaylist };
