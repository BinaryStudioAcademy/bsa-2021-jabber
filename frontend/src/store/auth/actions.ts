import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserCreatePayload, AsyncThunkConfig, User } from 'common/types/types';
import { ActionType } from './common';

const signUp = createAsyncThunk<Promise<User>,UserCreatePayload,AsyncThunkConfig>
(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
  const { authApi } = extra;
  const user = await authApi.signUp(registerPayload);

  return user;
});

export { signUp };
export type { User };
