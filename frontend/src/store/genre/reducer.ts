import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Genre } from 'common/types/types';
import { loadGenres } from './actions';

type State = {
  dataStatus: DataStatus;
  genres: Genre[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  genres: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadGenres.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadGenres.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.genres = action.payload;
  });
  builder.addCase(loadGenres.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
