import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Genre, Podcast } from 'common/types/types';
import { create, edit, loadPodcast, loadGenres, deletePodcast } from './actions';

type State = {
  dataStatus: DataStatus;
  genresDataStatus: DataStatus;
  podcast: Podcast | null;
  genres: Genre[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  genresDataStatus: DataStatus.IDLE,
  podcast: null,
  genres: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(create.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(create.fulfilled, (state) => {
    Object.assign(state, initialState);
  });
  builder.addCase(create.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(edit.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(edit.fulfilled, (state) => {
    Object.assign(state, initialState);
  });
  builder.addCase(edit.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
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
  builder.addCase(loadGenres.pending, (state) => {
    state.genresDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadGenres.fulfilled, (state, action) => {
    state.genresDataStatus = DataStatus.FULFILLED;
    state.genres = action.payload;
  });
  builder.addCase(loadGenres.rejected, (state) => {
    state.genresDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(deletePodcast.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(deletePodcast.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.podcast = null;
  });
  builder.addCase(deletePodcast.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
