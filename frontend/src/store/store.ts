import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import {
  authApi,
  podcastApi,
  episodeApi,
  commentApi,
  userApi,
  genreApi,
  navigation as navigationService,
  storage as storageService,
  recordAudio as recordAudioService,
  notification as notificationService,
} from 'services/services';
import { handleError as handleErrorMiddleware, socket as socketMiddleware } from 'middlewares/middlewares';

const extraArgument = {
  authApi,
  podcastApi,
  episodeApi,
  commentApi,
  userApi,
  genreApi,
  storageService,
  recordAudioService,
  notificationService,
  navigationService,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }).concat(handleErrorMiddleware, socketMiddleware);
  },
});

export { extraArgument, store };
