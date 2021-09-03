import { createReducer } from '@reduxjs/toolkit';
import { DataStatus, RecordStatus } from 'common/enums/enums';
import { Comment, Episode } from 'common/types/types';
import {
  pauseRecord,
  resumeRecord,
  startRecord,
  stopRecord,
  resetState,
  setLiveStream,
  initRecord,
  changeEpisodeStatus,
  createComment,
  deleteComment,
  loadCommentsByEpisodeId,
  loadEpisodePayload,
  updateComments,
  updateCommentsAfterDelete,
  updateCommentsAfterLike,
} from './actions';
import { getSortedItems } from 'jabber-shared/helpers/helpers';

type State = {
  recordStatus: RecordStatus;
  recordInitStatus: DataStatus;
  liveStream: MediaStream | null;
  liveRecordDataUrl: string | null;
  dataStatus: DataStatus;
  commentDataStatus: DataStatus;
  episode: Episode | null;
  comments: Comment[];
};

const initialState: State = {
  recordStatus: RecordStatus.INACTIVE,
  recordInitStatus: DataStatus.IDLE,
  liveStream: null,
  liveRecordDataUrl: null,
  dataStatus: DataStatus.IDLE,
  commentDataStatus: DataStatus.IDLE,
  episode: null,
  comments: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(initRecord.pending, (state) => {
    state.recordInitStatus = DataStatus.PENDING;
  });
  builder.addCase(initRecord.fulfilled, (state) => {
    state.recordInitStatus = DataStatus.FULFILLED;
  });
  builder.addCase(initRecord.rejected, (state) => {
    state.recordInitStatus = DataStatus.REJECTED;
  });
  builder.addCase(startRecord.fulfilled, (state) => {
    state.recordStatus = RecordStatus.RECORDING;
  });
  builder.addCase(pauseRecord.fulfilled, (state) => {
    state.recordStatus = RecordStatus.PAUSED;
  });
  builder.addCase(resumeRecord.fulfilled, (state) => {
    state.recordStatus = RecordStatus.RECORDING;
  });
  builder.addCase(stopRecord.fulfilled, (state, action) => {
    state.recordStatus = RecordStatus.INACTIVE;
    state.liveRecordDataUrl = action.payload;
  });
  builder.addCase(resetState, (state) => {
    Object.assign(state, initialState);
  });
  builder.addCase(setLiveStream, (state, action) => {
    state.liveStream = action.payload;
  });

  builder.addCase(loadEpisodePayload.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadEpisodePayload.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.episode = action.payload;
  });
  builder.addCase(loadEpisodePayload.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(loadCommentsByEpisodeId.pending, (state) => {
    state.commentDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadCommentsByEpisodeId.fulfilled, (state, action) => {
    state.commentDataStatus = DataStatus.FULFILLED;
    state.comments = action.payload.reverse();
  });
  builder.addCase(loadCommentsByEpisodeId.rejected, (state) => {
    state.commentDataStatus = DataStatus.REJECTED;
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
  builder.addCase(deleteComment.pending, (state) => {
    state.commentDataStatus = DataStatus.PENDING;
  });
  builder.addCase(deleteComment.fulfilled, (state) => {
    state.commentDataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(deleteComment.rejected, (state) => {
    state.commentDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(changeEpisodeStatus.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(changeEpisodeStatus.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.episode = action.payload;
  });
  builder.addCase(changeEpisodeStatus.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(updateCommentsAfterLike, (state, action) => {
    const filtered = state.comments.filter((comment) => comment.id !== action.payload.id);
    const comments = getSortedItems(
      [action.payload, ...filtered],
      (commentA, commentB) => new Date(commentB.createdAt).getTime() - new Date(commentA.createdAt).getTime(),
    );
    state.comments = comments;
  });
  builder.addCase(updateCommentsAfterDelete, (state, action) => {
    state.comments = state.comments.filter((comment) => comment.id !== action.payload.id);
  });
  builder.addCase(updateComments, (state, action) => {
    state.comments = [action.payload, ...state.comments];
  });

});

export { reducer };
