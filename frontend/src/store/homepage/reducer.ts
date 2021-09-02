import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Podcast, User, Genre } from 'common/types/types';
import { loadPodcasts, loadPopularUsers, loadGenres, leaveHomepage } from './actions';

type State = {
  dataStatus: DataStatus;
  genresDataStatus: DataStatus;
  popularUsersDataStatus: DataStatus;
  podcasts: Podcast[];
  genres: Genre[];
  totalPagesCount: number;
  popularUsers: User[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  genresDataStatus: DataStatus.IDLE,
  popularUsersDataStatus: DataStatus.IDLE,
  podcasts: [],
  genres: [],
  totalPagesCount: 0,
  popularUsers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadPodcasts.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadPodcasts.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.podcasts = action.payload.results;
    state.totalPagesCount = action.payload.totalPagesCount;
  });
  builder.addCase(loadPodcasts.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(loadPopularUsers.pending, (state) => {
    state.popularUsersDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadPopularUsers.fulfilled, (state, action) => {
    state.popularUsersDataStatus = DataStatus.FULFILLED;
    state.popularUsers = action.payload;
  });
  builder.addCase(loadPopularUsers.rejected, (state) => {
    state.popularUsersDataStatus = DataStatus.REJECTED;
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
  builder.addCase(leaveHomepage, (state) => {
    state.podcasts = [];
  });
});

export { reducer };
