import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Podcast } from 'common/types/types';
import { create } from './actions';

type State = {
  dataStatus: DataStatus;
  podcast: Podcast | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  podcast: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(create.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(create.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(create.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
