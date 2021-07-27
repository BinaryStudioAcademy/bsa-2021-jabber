import { reducer as auth } from './auth/reducer';
import { reducer as counter } from './counter/reducer';

const rootReducer = {
  auth,
  counter,
};

export { rootReducer };
