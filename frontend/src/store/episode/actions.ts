import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { NotificationMessage, NotificationTitle } from 'common/enums/enums';
import {
  User,
  Episode,
  Comment,
  CommentFormCreatePayload,
  AsyncThunkConfig,
  UserFavouriteEpisodePayload,
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

const deleteComment = createAsyncThunk <Comment, number, AsyncThunkConfig>
(ActionType.DELETE_COMMENT, async (id, { extra }) => {
  const { commentApi, notificationService } = extra;

  const deletedComment = await commentApi.delete(id);
  notificationService.success(NotificationTitle.SUCCESS, NotificationMessage.COMMENT_DELETED);
  return deletedComment;
});

const checkEpisodeIsFavorite = createAsyncThunk <boolean, number, AsyncThunkConfig>
(ActionType.CHECK_EPISODE_IS_FAVOURITE, async (episodeId, { extra }) => {
  const { episodeApi } = extra;

  return await episodeApi.checkEpisodeIsFavourite(episodeId);
});

const toggleFavourite = createAsyncThunk<boolean, undefined, AsyncThunkConfig>(
  ActionType.TOGGLE_FAVOURITE,
  async (_arg, { extra, getState }) => {
    const { episodeApi } = extra;
    const { episode, auth } = getState();

    const payload: UserFavouriteEpisodePayload = {
      episodeId: (<Episode>episode.episode).id,
      userId: (<User>auth.user).id,
    };

    if (episode.isFavourite) {
      await episodeApi.deleteEpisodeFromFavourites(payload);
      return false;
    }

    await episodeApi.addEpisodeToFavourites(payload);
    return true;
  },
);

const updateComments = createAction<Comment>(ActionType.UPDATE_COMMENTS);
const updateCommentsAfterDelete = createAction<Comment>(ActionType.UPDATE_COMMENTS_AFTER_DELETE);
const leaveEpisode = createAction<string>(ActionType.LEAVE_EPISODE);

export {
  loadEpisodePayload,
  loadCommentsByEpisodeId,
  createComment,
  updateComments,
  deleteComment,
  updateCommentsAfterDelete,
  leaveEpisode,
  checkEpisodeIsFavorite,
  toggleFavourite,
};
