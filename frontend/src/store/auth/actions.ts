import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserCreatePayload, AsyncThunkConfig, User, UserSignInPayload } from 'common/types/types';
import { StorageKey } from 'common/enums/enums';
import { ActionType } from './common';
import { NotificationMessage, NotificationTitle } from 'common/enums/enums';

const signUp = createAsyncThunk<User, UserCreatePayload, AsyncThunkConfig>
(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
  const { authApi, storageService, notificationService } = extra;
  const { user, token } = await authApi.signUp(registerPayload);

  storageService.setItem(StorageKey.TOKEN, token);
  notificationService.success(NotificationTitle.SUCCESS, `New user ${NotificationMessage.SUCCESS_CREATED}`);
  return user;
});

const signIn = createAsyncThunk<User, UserSignInPayload, AsyncThunkConfig>
(ActionType.SIGN_IN, async (loginPayload, { extra }) => {
  const { authApi, storageService } = extra;
  const { user, token } = await authApi.signIn(loginPayload);

  storageService.setItem(StorageKey.TOKEN, token);

  return user;
});

const getCurrentUser = createAsyncThunk<User, undefined, AsyncThunkConfig>
(ActionType.LOAD_USER, async (_args, { extra }) => {
  const { authApi } = extra;

  const user = await authApi.getCurrentUser();

  return user;
});

const resetUser = createAsyncThunk<void, undefined, AsyncThunkConfig>
(ActionType.RESET_USER, async (_args, { extra }) => {
  const { storageService } = extra;

  storageService.removeItem(StorageKey.TOKEN);
});

export { signUp, signIn, getCurrentUser, resetUser };
