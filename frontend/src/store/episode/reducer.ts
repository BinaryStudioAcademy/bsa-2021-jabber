import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Episode, Comment } from 'common/types/types';
import { loadEpisode } from './actions';
import { loadCommentsByEpisodeId } from '../comment/actions';

type State = {
  dataStatus: DataStatus;
  episode: Episode | null;
  comments: Comment[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  episode: null,
  comments: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadEpisode.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadEpisode.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.episode = action.payload;
  });
  builder.addCase(loadEpisode.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(loadCommentsByEpisodeId.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadCommentsByEpisodeId.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.comments = action.payload;
  });
  builder.addCase(loadCommentsByEpisodeId.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
