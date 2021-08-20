import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import {
  authApi,
  podcastApi,
  episodeApi,
  commentApi,
  userApi,
  userNotificationApi,
  genreApi,
  navigation as navigationService,
  storage as storageService,
  recordAudio as recordAudioService,
  notification as notificationService,
} from 'services/services';
import {
  handleError as handleErrorMiddleware,
  socket as socketMiddleware,
} from 'middlewares/middlewares';
import { ActionType as RecordActionType } from './record/common';
import { DataStatus } from 'common/enums/enums';

const extraArgument = {
  authApi,
  podcastApi,
  episodeApi,
  commentApi,
  userApi,
  userNotificationApi,
  genreApi,
  storageService,
  recordAudioService,
  notificationService,
  navigationService,
};

const ignoredActions = [
  `${RecordActionType.START_RECORD}/${DataStatus.FULFILLED}`,
  `${RecordActionType.SET_LIVE_STREAM}/${DataStatus.FULFILLED}`,
];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions,
      },
      thunk: {
        extraArgument,
      },
    }).concat(handleErrorMiddleware, socketMiddleware);
  },
});

export { extraArgument, store };
