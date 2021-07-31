import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Episode } from 'common/types/types';
import { loadEpisode, loadEpisodes } from './actions';

type State = {
  dataStatus: DataStatus;
  episode: Episode | null;
  episodes: Episode[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  episode: null,
  episodes: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadEpisode.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadEpisode.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.episode = action.payload;
  });
  builder.addCase(loadEpisode.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(loadEpisodes.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadEpisodes.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.episodes = action.payload;
  });
  builder.addCase(loadEpisodes.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
