enum ActionType {
  INIT_RECORD = 'recordAudio/init-record',
  START_RECORD = 'recordAudio/start-record',
  PAUSE_RECORD = 'recordAudio/pause-record',
  RESUME_RECORD = 'recordAudio/resume-record',
  STOP_RECORD = 'recordAudio/stop-record',
  RESET_STATE = 'recordAudio/reset-state',
  SET_LIVE_STREAM = 'recordAudio/set-live-stream',
  LOAD_COMMENTS_BY_EPISODE_ID = 'recordAudio/load-comments-by-episode-id',
  LOAD_EPISODE_PAYLOAD = 'recordAudio/episode-payload',
  CREATE_COMMENT = 'recordAudio/create-comment',
  UPDATE_COMMENTS = 'recordAudio/update-comments',
  LIKE_COMMENT = 'recordAudio/like-comment',
  DELETE_COMMENT = 'recordAudio/delete-comment',
  UPDATE_COMMENTS_AFTER_DELETE = 'recordAudio/update-after-delete',
  UPDATE_COMMENTS_AFTER_LIKE = 'recordAudio/update-after-like',
  LEAVE_EPISODE = 'recordAudio/leave-episode',
  CHANGE_EPISODE_STATUS = 'recordAudio/change-status',
}

export { ActionType };
