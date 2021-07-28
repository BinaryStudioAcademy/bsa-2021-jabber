import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { authApi } from 'services/services';
import { handleError as handleErrorMiddleware } from 'middlewares/middlewares';

const extraArgument = {
  authApi,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
      handleErrorMiddleware,
    });
  },
});

export { extraArgument, store };
