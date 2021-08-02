import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Episode } from 'common/types/types';
import { createEpisode } from './actions';

type State = {
  dataStatus: DataStatus;
  episode: Episode | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  episode: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(createEpisode.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(createEpisode.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.episode = action.payload;
  });
  builder.addCase(createEpisode.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
