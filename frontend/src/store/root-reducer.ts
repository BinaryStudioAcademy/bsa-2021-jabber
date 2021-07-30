import { reducer as auth } from './auth/reducer';
import { reducer as configuratePodcast } from './configurate-pocast/reducer';
import { reducer as homepage } from './homepage/reducer';
import { reducer as toastrReducer } from 'react-redux-toastr';

const rootReducer = {
  auth,
  configuratePodcast,
  homepage,
  toastr: toastrReducer,
};

export { rootReducer };
