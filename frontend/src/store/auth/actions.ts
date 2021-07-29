import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserCreatePayload, AsyncThunkConfig, User, SignInPayload } from 'common/types/types';
import { ActionType } from './common';

const signUp = createAsyncThunk<Promise<User>, UserCreatePayload, AsyncThunkConfig>
(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
  const { authApi } = extra;
  const user = await authApi.signUp(registerPayload);

  return user;
});

const signIn = createAsyncThunk<Promise<User>, SignInPayload, AsyncThunkConfig>
(ActionType.SIGN_IN, async (loginPayload, { extra }) => {
  const { authApi } = extra;
  const user = await authApi.signIn(loginPayload);

  return user;
});

export { signUp, signIn };
