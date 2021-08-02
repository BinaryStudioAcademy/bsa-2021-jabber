import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Podcast, Image } from 'common/types/types';
import { create, createCover } from './actions';

type State = {
  dataStatus: DataStatus;
  podcast: Podcast | null;
  image: Image | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  podcast: null,
  image: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(create.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(create.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.podcast = action.payload;
  });
  builder.addCase(create.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(createCover.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(createCover.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.image = action.payload;
  });
  builder.addCase(createCover.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
