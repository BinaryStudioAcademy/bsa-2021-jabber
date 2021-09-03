import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Episode, Comment, Podcast, Playlist } from 'common/types/types';
import {
  loadEpisodePayload,
  loadCommentsByEpisodeId,
  createComment,
  updateComments,
  deleteComment,
  updateCommentsAfterDelete,
  checkEpisodeIsFavorite,
  toggleFavourite,
  toggleCommentLike,
  updateCommentsAfterLike,
  loadPlaylists,
} from './actions';
import { getSortedItems } from 'jabber-shared/helpers/helpers';

type State = {
  dataStatus: DataStatus;
  commentDataStatus: DataStatus;
  favouriteDataStatus: DataStatus;
  playlistsDataStatus: DataStatus;
  isFavourite: boolean;
  episode: Episode | null;
  comments: Comment[];
  podcast: Podcast | null;
  playlists: Playlist[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  commentDataStatus: DataStatus.IDLE,
  favouriteDataStatus: DataStatus.IDLE,
  playlistsDataStatus: DataStatus.IDLE,
  isFavourite: false,
  episode: null,
  comments: [],
  podcast: null,
  playlists: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadEpisodePayload.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadEpisodePayload.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.episode = action.payload.episode;
    state.podcast = action.payload.podcast;
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

  builder.addCase(toggleCommentLike.pending, (state) => {
    state.commentDataStatus = DataStatus.PENDING;
  });
  builder.addCase(toggleCommentLike.fulfilled, (state) => {
    state.commentDataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(toggleCommentLike.rejected, (state) => {
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
  builder.addCase(checkEpisodeIsFavorite.pending, (state) => {
    state.favouriteDataStatus = DataStatus.PENDING;
  });
  builder.addCase(checkEpisodeIsFavorite.fulfilled, (state, action) => {
    state.favouriteDataStatus = DataStatus.FULFILLED;
    state.isFavourite = action.payload;
  });
  builder.addCase(checkEpisodeIsFavorite.rejected, (state) => {
    state.favouriteDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(toggleFavourite.fulfilled, (state, action) => {
    state.isFavourite = action.payload;
  });
  builder.addCase(loadPlaylists.pending, (state) => {
    state.playlistsDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadPlaylists.fulfilled, (state, action) => {
    state.playlistsDataStatus = DataStatus.FULFILLED;
    state.playlists = action.payload;
  });
  builder.addCase(loadPlaylists.rejected, (state) => {
    state.playlistsDataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
