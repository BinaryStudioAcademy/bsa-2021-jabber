import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import {
  authApi,
  podcastApi,
  imageApi,
  episodeApi,
  storage as storageService,
} from 'services/services';
import { handleError as handleErrorMiddleware } from 'middlewares/middlewares';

const extraArgument = {
  authApi,
  podcastApi,
  imageApi,
  episodeApi,
  storageService,
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
