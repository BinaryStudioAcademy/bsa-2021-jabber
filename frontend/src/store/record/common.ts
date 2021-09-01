enum ActionType {
  INIT_RECORD = 'recordAudio/init-record',
  START_RECORD = 'recordAudio/start-record',
  PAUSE_RECORD = 'recordAudio/pause-record',
  RESUME_RECORD = 'recordAudio/resume-record',
  STOP_RECORD = 'recordAudio/stop-record',
  RESET_STATE = 'recordAudio/reset-state',
  SET_LIVE_STREAM = 'recordAudio/set-live-stream',
  LOAD_EPISODE = 'live-episodes/load-episode',
  LOAD_COMMENTS_BY_EPISODE_ID = 'live-episodes-comments/load-comments-by-episode-id',
  LOAD_EPISODE_PAYLOAD = 'live-episodes/episode-payload',
  CREATE_COMMENT = 'live-episodes-comments/create-comment',
  UPDATE_COMMENTS = 'live-episodes-comments/update-comments',
  LIKE_COMMENT = 'live-episodes-comment/like-comment',
  UNLIKE_COMMENT = 'live-episodes-comment/unlike-comment',
  DELETE_COMMENT = 'live-episodes-comment/delete-comment',
  UPDATE_COMMENTS_AFTER_DELETE = 'live-episodes-comments/update-after-delete',
  UPDATE_COMMENTS_AFTER_LIKE = 'live-episodes-comments/update-after-like',
  LEAVE_EPISODE = 'live-episodes/leave-episode',
  CHANGE_EPISODE_STATUS = 'live-episodes/change-status',
}

export { ActionType };
