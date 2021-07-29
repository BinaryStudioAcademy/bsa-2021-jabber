import { reducer as auth } from './auth/reducer';
import { reducer as podcast } from './podcast/reducer';
import { reducer as toastrReducer } from 'react-redux-toastr';

const rootReducer = {
  auth,
  podcast,
  toastr: toastrReducer,
};

export { rootReducer };
