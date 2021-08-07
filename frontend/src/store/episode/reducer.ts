import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Episode } from 'common/types/types';
import { loadEpisode, loadEpisodesByPodcastId } from './actions';

type State = {
  dataStatus: DataStatus;
  episode: Episode | null;
  episodes: Episode[] | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  episode: null,
  episodes: null,
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

  builder.addCase(loadEpisodesByPodcastId.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadEpisodesByPodcastId.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.episodes = action.payload;
  });
  builder.addCase(loadEpisodesByPodcastId.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
