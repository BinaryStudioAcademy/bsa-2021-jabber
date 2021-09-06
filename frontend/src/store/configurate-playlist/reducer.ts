import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Playlist } from 'common/types/types';
import { create, deletePlaylist } from './actions';

type State = {
  dataStatus: DataStatus;
  playlist: Playlist | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  playlist: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(create.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(create.fulfilled, (state) => {
    Object.assign(state, initialState);
  });
  builder.addCase(create.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(deletePlaylist.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(deletePlaylist.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.playlist = null;
  });
  builder.addCase(deletePlaylist.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
