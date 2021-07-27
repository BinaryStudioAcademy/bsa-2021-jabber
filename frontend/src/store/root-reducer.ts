import { reducer as auth } from './auth/reducer';
import { reducer as counter } from './counter/reducer';
import { reducer as toastrReducer } from 'react-redux-toastr';

const rootReducer = {
  auth,
  counter,
  toastr: toastrReducer,
};

export { rootReducer };
