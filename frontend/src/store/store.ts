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
  userFollowerApi,
  podcastFollowerApi,
} from 'services/services';
import {
  handleError as handleErrorMiddleware,
  socket as socketMiddleware,
} from 'middlewares/middlewares';

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
  userFollowerApi,
  podcastFollowerApi,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      thunk: {
        extraArgument,
      },
    }).concat(handleErrorMiddleware, socketMiddleware);
  },
});

export { extraArgument, store };
