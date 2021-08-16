import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AppRoute,
  NotificationMessage,
  NotificationTitle,
} from 'common/enums/enums';
import { AsyncThunkConfig, User, UserEditPayload } from 'common/types/types';
import { ActionType } from './common';

const editUser = createAsyncThunk<User, UserEditPayload, AsyncThunkConfig>(
  ActionType.EDIT_USER,
  async (payload, { extra, getState }) => {
    const { userApi, notificationService, navigationService } = extra;
    const { auth } = getState();

    const user = await userApi.update((<User>auth.user).id, payload);

    notificationService.success(
      NotificationTitle.SUCCESS,
      NotificationMessage.USER_UPDATED,
    );

    navigationService.push(`${AppRoute.USERS}/${user.id}`);

    return user;
  },
);

export { editUser };
