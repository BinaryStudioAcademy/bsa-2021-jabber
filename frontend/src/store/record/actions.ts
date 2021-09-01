import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  Episode,
  StartRecordActionPayload,
  Comment,
  CommentFormCreatePayload,
  User,
} from 'common/types/types';
import { AppRoute, NotificationMessage, NotificationTitle } from 'common/enums/enums';
import { checkIsLiked, getDataUrl } from 'helpers/helpers';
import { ActionType } from './common';

const initRecord = createAsyncThunk<void, undefined, AsyncThunkConfig>
(ActionType.INIT_RECORD, async (_arg, { extra }) => {
  const { recordAudioService } = extra;

  await recordAudioService.init();
});

const startRecord = createAsyncThunk<StartRecordActionPayload, string, AsyncThunkConfig>
(ActionType.START_RECORD, (id, { extra }) => {
  const { recordAudioService } = extra;
  const stream = recordAudioService.start();

  return {
    stream,
    id,
  };
});

const pauseRecord = createAsyncThunk<void, undefined, AsyncThunkConfig>
(ActionType.PAUSE_RECORD, (_arg, { extra }) => {
  const { recordAudioService } = extra;
  recordAudioService.pause();
});

const resumeRecord = createAsyncThunk<void, undefined, AsyncThunkConfig>
(ActionType.RESUME_RECORD, (_arg, { extra }) => {
  const { recordAudioService } = extra;
  recordAudioService.resume();
});

const stopRecord = createAsyncThunk<string, string, AsyncThunkConfig>
(ActionType.STOP_RECORD, async (_arg, { extra, getState }) => {
  const { recordAudioService, navigationService } = extra;
  const { record } = getState();
  const { id, podcastId }  = <Episode>record.episode;

  recordAudioService.stop();
  const liveRecord = await recordAudioService.getLiveRecord();
  const liveRecordDataUrl = await getDataUrl(liveRecord);

  navigationService.push(`${AppRoute.PODCASTS}/${podcastId}${AppRoute.EPISODES_EDIT}/${id}`);
  return liveRecordDataUrl;
});

const resetState = createAction(ActionType.RESET_STATE);
const setLiveStream = createAction<MediaStream>(ActionType.SET_LIVE_STREAM);

const loadEpisodePayload = createAsyncThunk<Episode, number, AsyncThunkConfig>
(ActionType.LOAD_EPISODE_PAYLOAD, async (id, { extra }) => {
  const { episodeApi } = extra;
  const episode = await episodeApi.getById(id);

  return episode;
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
  const { auth, record } = getState();
  const comment = await commentApi.create({
    ...payload,
    userId: (<User>auth.user).id,
    episodeId: (<Episode>record.episode).id,
  });

  return comment;
});

const toggleCommentLike = createAsyncThunk <Comment, number, AsyncThunkConfig>
(ActionType.LIKE_COMMENT, async (commentId, { extra, getState }) =>{
  const { commentApi } = extra;
  const { auth } = getState();
  const currentComment = await commentApi.getById(commentId);
  const isLiked = checkIsLiked(currentComment, auth.user?.id);
  const comment = isLiked
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

const changeEpisodeStatus = createAsyncThunk <Episode, Episode, AsyncThunkConfig>
(ActionType.CHANGE_EPISODE_STATUS, async (episode, { extra }) =>{
  const { episodeApi } = extra;

  const updatedEpisode = await episodeApi.update(episode.id, {
    name: episode.name,
    description: episode.description,
    shownotes: episode.shownotes,
    type: episode.type,
    recordDataUrl: null,
    imageDataUrl: null,
    userId: episode.userId,
    imageId: episode.imageId,
    status: episode.status,
  });

  return updatedEpisode;
});

const updateComments = createAction<Comment>(ActionType.UPDATE_COMMENTS);
const updateCommentsAfterDelete = createAction<Comment>(ActionType.UPDATE_COMMENTS_AFTER_DELETE);
const updateCommentsAfterLike = createAction<Comment>(ActionType.UPDATE_COMMENTS_AFTER_LIKE);

export {
  initRecord,
  startRecord,
  pauseRecord,
  resumeRecord,
  stopRecord,
  setLiveStream,
  resetState,
  loadEpisodePayload,
  loadCommentsByEpisodeId,
  createComment,
  updateComments,
  toggleCommentLike,
  deleteComment,
  updateCommentsAfterDelete,
  updateCommentsAfterLike,
  changeEpisodeStatus,
};
