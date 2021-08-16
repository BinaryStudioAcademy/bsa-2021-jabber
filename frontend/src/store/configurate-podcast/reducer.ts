import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Genre, Podcast } from 'common/types/types';
import { create, edit, loadPodcast, resetState, loadGenres } from './actions';

type State = {
  dataStatusPodcast: DataStatus;
  dataStatusGenres: DataStatus;
  podcast: Podcast | null;
  genres: Genre[];
};

const initialState: State = {
  dataStatusPodcast: DataStatus.IDLE,
  dataStatusGenres: DataStatus.IDLE,
  podcast: null,
  genres: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(create.pending, (state) => {
    state.dataStatusPodcast = DataStatus.PENDING;
  });
  builder.addCase(create.fulfilled, (state, action) => {
    state.dataStatusPodcast = DataStatus.FULFILLED;
    state.podcast = action.payload;
  });
  builder.addCase(create.rejected, (state) => {
    state.dataStatusPodcast = DataStatus.REJECTED;
  });
  builder.addCase(edit.pending, (state) => {
    state.dataStatusPodcast = DataStatus.PENDING;
  });
  builder.addCase(edit.fulfilled, (state, action) => {
    state.dataStatusPodcast = DataStatus.FULFILLED;
    state.podcast = action.payload;
  });
  builder.addCase(edit.rejected, (state) => {
    state.dataStatusPodcast = DataStatus.REJECTED;
  });
  builder.addCase(loadPodcast.pending, (state) => {
    state.dataStatusPodcast = DataStatus.PENDING;
  });
  builder.addCase(loadPodcast.fulfilled, (state, action) => {
    state.dataStatusPodcast = DataStatus.FULFILLED;
    state.podcast = action.payload;
  });
  builder.addCase(loadPodcast.rejected, (state) => {
    state.dataStatusPodcast = DataStatus.REJECTED;
  });
  builder.addCase(resetState, (state) => {
    Object.assign(state, initialState);
  });
  builder.addCase(loadGenres.pending, (state) => {
    state.dataStatusGenres = DataStatus.PENDING;
  });
  builder.addCase(loadGenres.fulfilled, (state, action) => {
    state.dataStatusGenres = DataStatus.FULFILLED;
    state.genres = action.payload;
  });
  builder.addCase(loadGenres.rejected, (state) => {
    state.dataStatusGenres = DataStatus.REJECTED;
  });
});

export { reducer };
