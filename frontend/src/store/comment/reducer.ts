import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Comment } from 'common/types/types';
import { loadCommentsByEpisodeId } from './actions';

type State = {
  dataStatus: DataStatus;
  comments: Comment[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  comments: [],
};

const reducer = createReducer(initialState, (builder) => {
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
