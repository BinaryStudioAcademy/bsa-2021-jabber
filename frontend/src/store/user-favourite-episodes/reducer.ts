import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { EpisodeWithPodcast } from 'common/types/types';
import { loadFavouriteEpisodes } from './actions';

type State = {
  dataStatus: DataStatus;
  episodes: EpisodeWithPodcast[];
  episodesTotalCount: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  episodes: [],
  episodesTotalCount: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadFavouriteEpisodes.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadFavouriteEpisodes.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;

    const { episodes, totalCount } = action.payload;

    state.episodes = episodes;
    state.episodesTotalCount = totalCount;
  });
  builder.addCase(loadFavouriteEpisodes.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
