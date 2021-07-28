import { reducer as auth } from './auth/reducer';
import { reducer as toastrReducer } from 'react-redux-toastr';

const rootReducer = {
  auth,
  toastr: toastrReducer,
};

export { rootReducer };
