import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { NotificationMessage, NotificationTitle } from 'common/enums/enums';
import {
  User,
  Episode,
  Comment,
  CommentFormCreatePayload,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType, LoadEpisodePayload } from './common';

const loadEpisodePayload = createAsyncThunk<LoadEpisodePayload, number, AsyncThunkConfig>
(ActionType.LOAD_EPISODE_PAYLOAD, async (id, { extra }) => {
  const { episodeApi, podcastApi } = extra;
  const episode = await episodeApi.getById(id);
  const podcast = await podcastApi.getById(episode.podcastId);

  return {
    episode,
    podcast,
  };
});

const loadCommentsByEpisodeId = createAsyncThunk<Comment[], number, AsyncThunkConfig>
(ActionType.LOAD_COMMENTS_BY_EPISODE_ID, async (episodeId, { extra }) => {
  const { commentApi } = extra;
  const comments = await commentApi.getAllByEpisodeId(episodeId);

  return comments;
});

const createComment = createAsyncThunk<Comment, CommentFormCreatePayload, AsyncThunkConfig>
(ActionType.CREATE_COMMENT, async (payload, { extra, getState }) => {
  const { commentApi } = extra;
  const { auth, episode } = getState();
  const comment = await commentApi.create({
    ...payload,
    userId: (<User>auth.user).id,
    episodeId: (<Episode>episode.episode).id,
  });

  return comment;
});

const toggleCommentLike = createAsyncThunk <Comment, number, AsyncThunkConfig>
(ActionType.LIKE_COMMENT, async (commentId, { extra, getState }) =>{
  const { commentApi } = extra;
  const { auth } = getState();
  const currentComment = await commentApi.getById(commentId);
  const checkIsLiked = currentComment.commentReactions.some((reaction) => reaction.userId === auth.user?.id);
  
  const comment = checkIsLiked 
    ? await commentApi.deleteCommentReaction({ commentId })
    : await commentApi.createCommentReaction({ commentId });

  return comment;
});

const deleteComment = createAsyncThunk <Comment, number, AsyncThunkConfig>
(ActionType.DELETE_COMMENT, async (id, { extra }) => {
  const { commentApi, notificationService } = extra;

  const deletedComment = await commentApi.delete(id);
  notificationService.success(NotificationTitle.SUCCESS, NotificationMessage.COMMENT_DELETED);
  return deletedComment;
});

const updateComments = createAction<Comment>(ActionType.UPDATE_COMMENTS);
const updateCommentsAfterDelete = createAction<Comment>(ActionType.UPDATE_COMMENTS_AFTER_DELETE);
const updateCommentsAfterLike = createAction<Comment>(ActionType.UPDATE_COMMENTS_AFTER_LIKE);
const leaveEpisode = createAction<string>(ActionType.LEAVE_EPISODE);

export {
  loadEpisodePayload,
  loadCommentsByEpisodeId,
  createComment,
  updateComments,
  toggleCommentLike,
  deleteComment,
  updateCommentsAfterDelete,
  updateCommentsAfterLike,
  leaveEpisode,
};
