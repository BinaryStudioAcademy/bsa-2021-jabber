import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { create } from './actions';

type State = {
  formDataStatus: DataStatus;
};

const initialState: State = {
  formDataStatus: DataStatus.IDLE,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(create.pending, (state) => {
    state.formDataStatus = DataStatus.PENDING;
  });
  builder.addCase(create.fulfilled, (state) => {
    Object.assign(state, initialState);
  });
  builder.addCase(create.rejected, (state) => {
    state.formDataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
