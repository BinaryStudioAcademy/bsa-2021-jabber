import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Podcast, Episode } from 'common/types/types';
import { loadPodcast, loadEpisodesByPodcastId } from './actions';

type State = {
  dataStatus: DataStatus;
  podcast: Podcast | null;
  episodes: Episode[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  podcast: null,
  episodes: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadPodcast.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadPodcast.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.podcast = action.payload;
  });
  builder.addCase(loadPodcast.rejected, (state) => {
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
