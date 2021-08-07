import { reducer as auth } from './auth/reducer';
import { reducer as configuratePodcast } from './configurate-podcast/reducer';
import { reducer as configurateEpisode } from './configurate-episode/reducer';
import { reducer as homepage } from './homepage/reducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as episode } from './episode/reducer';
import { reducer as podcast } from './podcast/reducer';
import { reducer as record } from './record/reducer';

const rootReducer = {
  auth,
  configuratePodcast,
  configurateEpisode,
  homepage,
  episode,
  podcast,
  record,
  toastr: toastrReducer,
};

export { rootReducer };
