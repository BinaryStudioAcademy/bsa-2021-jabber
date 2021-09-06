import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { EpisodeWithPodcast, Playlist } from 'common/types/types';
import {
  loadById,
  loadEpisodesByPlaylistId,
  deletePlaylist,
} from './actions';

type State = {
  dataStatus: DataStatus;
  playlist: Playlist | null;
  episodes: EpisodeWithPodcast[];
  episodesDataStatus: DataStatus;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  playlist: null,
  episodes: [],
  episodesDataStatus: DataStatus.IDLE,
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
