import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { signUp, signIn } from './actions';
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
  builder.addCase(signUp.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(signUp.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(signUp.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(signIn.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(signIn.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(signIn.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
