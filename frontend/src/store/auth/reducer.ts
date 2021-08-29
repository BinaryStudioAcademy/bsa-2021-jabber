import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  auth as authActions,
  configurateUser as configurateUserActions,
} from 'store/actions';
import { User } from 'common/types/types';

type State = {
  dataStatus: DataStatus;
  user: User | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(authActions.signUp.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(authActions.signUp.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = action.payload;
  });
  builder.addCase(authActions.signUp.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(authActions.signIn.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(authActions.signIn.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = action.payload;
  });
  builder.addCase(authActions.signIn.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(authActions.getCurrentUser.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(authActions.getCurrentUser.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = action.payload;
  });
  builder.addCase(authActions.getCurrentUser.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(authActions.resetUser.fulfilled, (state) => {
    state.dataStatus = DataStatus.IDLE;
    state.user = null;
  });
  builder.addCase(
    configurateUserActions.editUser.fulfilled,
    (state, action) => {
      state.user = action.payload;
    },
  );
  builder.addCase(authActions.resetPassword.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(authActions.resetPassword.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(authActions.resetPassword.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
