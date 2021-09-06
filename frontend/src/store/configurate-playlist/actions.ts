import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { getDataUrl, getFileFromFileList } from 'helpers/helpers';
import {
  AsyncThunkConfig,
  User,
  PlaylistFormPayload,
  Playlist,
} from 'common/types/types';
import { ActionType } from './common';
import { AppRoute, NotificationMessage, NotificationTitle } from 'common/enums/enums';

const create = createAsyncThunk<void, PlaylistFormPayload, AsyncThunkConfig>(
  ActionType.CREATE_PLAYLIST,
  async (playlistPayload, { getState, extra }) => {
    const { playlistApi, notificationService, navigationService } = extra;
    const { auth } = getState();
    const coverFile = getFileFromFileList(playlistPayload.cover);

    const playlist = await playlistApi.create({
      userId: (<User>auth.user).id,
      name: playlistPayload.name,
      description: playlistPayload.description,
      status: playlistPayload.status,
      coverDataUrl: coverFile ? await getDataUrl(coverFile) : null,
    });

    notificationService.success(NotificationTitle.SUCCESS, NotificationMessage.PLAYLIST_CREATED);

    navigationService.push(`${AppRoute.PLAYLISTS}/${playlist.id}`);
  },
);

const loadPlaylist = createAsyncThunk<Playlist, number, AsyncThunkConfig>(
  ActionType.LOAD_PLAYLIST,
  async (id, { extra }) => {
    const { playlistApi } = extra;
    const playlist = await playlistApi.getById(id);

    return playlist;
  });

const edit = createAsyncThunk<void, PlaylistFormPayload, AsyncThunkConfig>(
  ActionType.EDIT_PLAYLIST,
  async (playlistPayload, { getState, extra }) => {
    const { playlistApi, notificationService, navigationService } = extra;
    const { auth, configuratePlaylist } = getState();
    const coverFile = getFileFromFileList(playlistPayload.cover);

    const playlist = await playlistApi.update(
      (<Playlist>configuratePlaylist.playlist).id,
      {
        userId: (<User>auth.user).id,
        name: playlistPayload.name,
        description: playlistPayload.description,
        status: playlistPayload.status,
        coverDataUrl: coverFile ? await getDataUrl(coverFile) : null,
      });

    notificationService.success(NotificationTitle.SUCCESS, NotificationMessage.PLAYLIST_UPDATED);

    navigationService.push(`${AppRoute.PLAYLISTS}/${playlist.id}`);
  },
);

const resetState = createAction(ActionType.RESET_STATE);

export { create, loadPlaylist, edit, resetState };
