import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { EpisodeWithPodcast, Playlist, User } from 'common/types/types';
import { loadById, loadEpisodesByPlaylistId, loadPlaylists, loadPlaylistsOwner } from './actions';

type State = {
  dataStatus: DataStatus;
  playlist: Playlist | null;
  episodes: EpisodeWithPodcast[];
  episodesDataStatus: DataStatus;
  playlists: Playlist[];
  user: User | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  playlist: null,
  episodes: [],
  episodesDataStatus: DataStatus.IDLE,
  playlists: [],
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadById.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadById.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.playlist = action.payload;
  });
  builder.addCase(loadById.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(loadEpisodesByPlaylistId.pending, (state) => {
    state.episodesDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadEpisodesByPlaylistId.fulfilled, (state, action) => {
    state.episodesDataStatus = DataStatus.FULFILLED;
    state.episodes = action.payload;
  });
  builder.addCase(loadEpisodesByPlaylistId.rejected, (state) => {
    state.episodesDataStatus = DataStatus.REJECTED;
  });

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
