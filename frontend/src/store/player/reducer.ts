import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { setPlayerStatus, resetPlayer } from './actions';

type State = {
  dataStatus: DataStatus;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setPlayerStatus, (state, action) => {
    state.dataStatus = action.payload;
  });
  builder.addCase(resetPlayer, (state) => {
    Object.assign(state, initialState);
  });
});

export { reducer };
