import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import {
  authApi,
  podcastApi,
  episodeApi,
  commentApi,
  storage as storageService,
  recordAudio as recordAudioService,
} from 'services/services';
import { handleError as handleErrorMiddleware } from 'middlewares/middlewares';

const extraArgument = {
  authApi,
  podcastApi,
  episodeApi,
  commentApi,
  storageService,
  recordAudioService,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }).concat(handleErrorMiddleware);
  },
});

export { extraArgument, store };
