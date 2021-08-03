import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Podcast } from 'common/types/types';
import { create, edit, loadPodcast } from './actions';

type State = {
  dataStatus: DataStatus;
  podcast: Podcast | null;
  editablePodcast: Podcast | null
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  podcast: null,
  editablePodcast: null,
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
  builder.addCase(edit.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(edit.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.podcast = action.payload;
    state.editablePodcast = null;
  });
  builder.addCase(edit.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(loadPodcast.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadPodcast.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.editablePodcast = action.payload;
  });
  builder.addCase(loadPodcast.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
