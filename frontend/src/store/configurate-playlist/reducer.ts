import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Playlist } from 'common/types/types';
import { create, loadPlaylist, resetState } from './actions';

type State = {
  dataStatus: DataStatus;
  formDataStatus: DataStatus;
  playlist: Playlist | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  formDataStatus: DataStatus.IDLE,
  playlist: null,
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

  builder.addCase(loadPlaylist.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadPlaylist.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.playlist = action.payload;
  });
  builder.addCase(loadPlaylist.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(resetState, (state) => {
    Object.assign(state, initialState);
  });
});

export { reducer };
