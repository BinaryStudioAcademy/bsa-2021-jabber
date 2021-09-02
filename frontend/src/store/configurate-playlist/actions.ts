import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  User,
  PlaylistFormPayload,
} from 'common/types/types';
import { ActionType } from './common';
import { AppRoute, NotificationMessage, NotificationTitle } from 'common/enums/enums';

const create = createAsyncThunk<void, PlaylistFormPayload, AsyncThunkConfig>(
  ActionType.CREATE_PLAYLIST,
  async (payload, { getState, extra }) => {
    const { playlistApi, notificationService, navigationService } = extra;
    const { auth } = getState();

    const playlist = await playlistApi.create({
      userId: (<User>auth.user).id,
      name: payload.name,
      description: payload.description,
      status: payload.status,
      coverDataUrl: null,
    });

    notificationService.success(NotificationTitle.SUCCESS, NotificationMessage.PLAYLIST_CREATED);

    navigationService.push(`${AppRoute.PLAYLISTS}/${playlist.id}`);
  },
);

export { create };
