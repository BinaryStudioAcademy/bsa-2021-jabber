import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Playlist,
  AsyncThunkConfig,
  EpisodeWithPodcast,
  DeleteActionPlaylistPayload,
  PlaylistEpisode,
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

const deleteEpisodeFromPlaylist = createAsyncThunk<PlaylistEpisode, number, AsyncThunkConfig>(
  ActionType.DELETE_EPISODE_FROM_PLAYLIST,
  async (episodeId, { extra, getState }) => {
    const { playlistApi } = extra;
    const { playlist } = getState();

    return playlistApi.deleteEpisodeFromPlaylist({
      playlistId: (<Playlist>playlist.playlist).id,
      episodeId,
    });
  });

export { loadById, loadEpisodesByPlaylistId, deletePlaylist, deleteEpisodeFromPlaylist };
