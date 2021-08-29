import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Episode } from 'common/types/types';
import { loadFavouriteEpisodes } from './actions';

type State = {
  dataStatus: DataStatus;
  episodes: Episode[];
  episodesCount: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  episodes: [],
  episodesCount: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadFavouriteEpisodes.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadFavouriteEpisodes.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;

    const { episodes, totalCount } = action.payload;

    state.episodes = episodes;
    state.episodesCount = totalCount;
  });
  builder.addCase(loadFavouriteEpisodes.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
