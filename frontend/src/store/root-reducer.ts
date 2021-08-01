import { reducer as auth } from './auth/reducer';
import { reducer as configuratePodcast } from './configurate-podcast/reducer';
import { reducer as homepage } from './homepage/reducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as episodepage } from './episodepage/reducer';

const rootReducer = {
  auth,
  configuratePodcast,
  homepage,
  episodepage,
  toastr: toastrReducer,
};

export { rootReducer };
