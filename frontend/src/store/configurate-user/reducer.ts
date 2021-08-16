import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { editUser } from './actions';

type State = {
  dataStatus: DataStatus;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(editUser.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(editUser.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(editUser.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
