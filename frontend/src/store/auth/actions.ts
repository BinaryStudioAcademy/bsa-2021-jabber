import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserCreatePayload, AsyncThunkConfig, User, UserSignInPayload } from 'common/types/types';
import { StorageKey } from 'common/enums/enums';
import { ActionType } from './common';
import { storage } from 'services/services';

const signUp = createAsyncThunk<User, UserCreatePayload, AsyncThunkConfig>
(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
  const { authApi } = extra;
  const { user, token } = await authApi.signUp(registerPayload);
  storage.setItem(StorageKey.TOKEN, token);
  return user;
});

const signIn = createAsyncThunk<User, UserSignInPayload, AsyncThunkConfig>
(ActionType.SIGN_IN, async (loginPayload, { extra }) => {
  const { authApi } = extra;
  const { user, token } = await authApi.signIn(loginPayload);
  storage.setItem(StorageKey.TOKEN, token);
  return user;
});

export { signUp, signIn };
