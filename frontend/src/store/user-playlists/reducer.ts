import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Playlist, User } from 'common/types/types';
import { loadPlaylists, loadPlaylistsOwner } from './actions';

type State = {
  playlistsDataStatus: DataStatus;
  userDataStatus: DataStatus;
  playlists: Playlist[];
  user: User | null;
};

const initialState: State = {
  playlistsDataStatus: DataStatus.IDLE,
  userDataStatus: DataStatus.IDLE,
  playlists: [],
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadPlaylists.pending, (state) => {
    state.playlistsDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadPlaylists.fulfilled, (state, action) => {
    state.playlistsDataStatus = DataStatus.FULFILLED;
    state.playlists = action.payload;
  });
  builder.addCase(loadPlaylists.rejected, (state) => {
    state.playlistsDataStatus = DataStatus.REJECTED;
  });

  builder.addCase(loadPlaylistsOwner.pending, (state) => {
    state.userDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadPlaylistsOwner.fulfilled, (state, action) => {
    state.userDataStatus = DataStatus.FULFILLED;
    state.user = action.payload;
  });
  builder.addCase(loadPlaylistsOwner.rejected, (state) => {
    state.userDataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
