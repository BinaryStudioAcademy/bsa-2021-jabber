import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Playlist } from 'common/types/types';
import { loadPlaylists } from './actions';

type State = {
  dataStatus: DataStatus;
  playlists: Playlist[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  playlists: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadPlaylists.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadPlaylists.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.playlists = action.payload;
  });
  builder.addCase(loadPlaylists.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
