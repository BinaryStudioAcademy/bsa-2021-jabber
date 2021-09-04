import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { EpisodeWithPodcast, Playlist } from 'common/types/types';
import { loadById } from './actions';

type State = {
  dataStatus: DataStatus;
  playlist: Playlist | null;
  episodes: EpisodeWithPodcast[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  playlist: null,
  episodes: [],
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

});

export { reducer };
