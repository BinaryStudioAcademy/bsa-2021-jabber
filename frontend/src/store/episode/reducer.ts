import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Episode, Comment } from 'common/types/types';
import { loadEpisode, loadCommentsByEpisodeId, createComment } from './actions';

type State = {
  dataStatus: DataStatus;
  commentDataStatus: DataStatus;
  episode: Episode | null;
  comments: Comment[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  commentDataStatus: DataStatus.IDLE,
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
  builder.addCase(createComment.pending, (state) => {
    state.commentDataStatus = DataStatus.PENDING;
  });
  builder.addCase(createComment.fulfilled, (state, action) => {
    state.commentDataStatus = DataStatus.FULFILLED;
    state.comments.push(action.payload);
  });
  builder.addCase(createComment.rejected, (state) => {
    state.commentDataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
