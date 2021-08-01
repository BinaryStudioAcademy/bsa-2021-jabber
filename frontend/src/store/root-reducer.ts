import { reducer as auth } from './auth/reducer';
import { reducer as homepage } from './homepage/reducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as episode } from './episode/reducer';

const rootReducer = {
  auth,
  homepage,
  episode,
  toastr: toastrReducer,
};

export { rootReducer };
