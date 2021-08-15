import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Episode, Comment, Podcast } from 'common/types/types';
import { loadEpisode, loadCommentsByEpisodeId, createComment, updateComments } from './actions';

type State = {
  dataStatus: DataStatus;
  commentDataStatus: DataStatus;
  episode: Episode | null;
  comments: Comment[];
  podcast: Podcast | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  commentDataStatus: DataStatus.IDLE,
  episode: null,
  comments: [],
  podcast: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadEpisode.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadEpisode.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.episode = action.payload.episode;
    state.podcast = action.payload.podcast;
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
  builder.addCase(createComment.fulfilled, (state) => {
    state.commentDataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(createComment.rejected, (state) => {
    state.commentDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(updateComments, (state, action) => {
    state.comments.push(action.payload);
  });
});

export { reducer };
