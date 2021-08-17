import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AppRoute,
  NotificationMessage,
  NotificationTitle,
} from 'common/enums/enums';
import { AsyncThunkConfig, User, UserEditFormPayload } from 'common/types/types';
import { ActionType } from './common';
import { getDataUrl, getFileFromFileList } from 'helpers/helpers';

const editUser = createAsyncThunk<User, UserEditFormPayload, AsyncThunkConfig>(
  ActionType.EDIT_USER,
  async (payload, { extra, getState }) => {
    const { userApi, notificationService, navigationService } = extra;
    const { auth } = getState();
    const { id, imageId } = <User>auth.user;
    const file = getFileFromFileList(payload.image);

    const user = await userApi.update(id, {
      firstName: payload.firstName,
      lastName: payload.lastName,
      nickname: payload.nickname,
      bio: payload.bio,
      email: payload.email,
      birthdate: payload.birthdate,
      imageDataUrl: file ? await getDataUrl(file) : null,
      imageId,
    });

    notificationService.success(
      NotificationTitle.SUCCESS,
      NotificationMessage.USER_UPDATED,
    );

    navigationService.push(`${AppRoute.USERS}/${user.id}`);

    return user;
  },
);

export { editUser };
