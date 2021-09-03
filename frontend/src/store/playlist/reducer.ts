import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Playlist, User } from 'common/types/types';
import { loadPlaylists, loadPlaylistsOwner } from './actions';

type State = {
  dataStatus: DataStatus;
  playlists: Playlist[];
  user: User | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  playlists: [],
  user: null,
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
  builder.addCase(loadPlaylistsOwner.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadPlaylistsOwner.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = action.payload;
  });
  builder.addCase(loadPlaylistsOwner.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
